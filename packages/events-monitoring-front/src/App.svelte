<script>
  import { isEmpty, isEmail, isEthereumAddress, isJSON } from "validator";
  import { watcher } from "./store.js";
  import { postNewWatcher } from "./services/api";
  import { keccak256 } from "js-sha3";
  import Form from "./components/Form/index.svelte";
  import Error from "./components/Error/index.svelte";
  import Success from "./components/Success/index.svelte";
  import SelectEvent from "./components/SelectEvent/index.svelte";

  const STATES = {
    FORM: "FORM",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    SELECT: "SELECT",
  };

  let state = STATES.FORM;
  let errors = { address: false, email: false, abi: false };

  const validation = (data) => {
    const errorList = [];
    if (isEmpty(data.email) || !isEmail(data.email)) {
      errorList.push("email");
    }
    if (isEmpty(data.address) || !isEthereumAddress(data.address)) {
      errorList.push("address");
    }
    if (isEmpty(data.abi) || !isJSON(data.abi)) {
      errorList.push("abi");
    }
    return errorList;
  };
  function handleBack() {
    // Reset store
    watcher.set({
      address: "",
      events: [],
      event: {},
      email: "",
    });
    state = STATES.FORM;
  }
  function handleSendData(event) {
    let events = [];
    const { data } = event.detail;
    const errorList = validation(data);

    // Check if abi has events
    if (!errorList.includes("abi")) {
      events = JSON.parse(data.abi).filter((ev) => ev.type === "event");
      if (events.length === 0) errorList.push("abi");
    }

    if (errorList.length === 0) {
      const parsedEvents = events.map((event) => {
        const inputs = event.inputs.map((input) => input.internalType);
        const signature = `0x${keccak256(
          `${event.name}(${inputs.join(",")})`
        )}`;
        return {
          ...event,
          signature,
          text: `${event.name}(${inputs.join(",")})`,
        };
      });
      console.log(parsedEvents);
      watcher.set({
        email: data.email,
        address: data.address,
        events: parsedEvents,
      });
      state = STATES.SELECT;
    } else {
      let newErrors = {};

      Object.keys(errors).forEach((key) => {
        if (errorList.includes(key)) {
          newErrors[key] = true;
        } else {
          newErrors[key] = false;
        }
      });
      errors = newErrors;
    }
  }
  async function handleSelectEvent(event) {
    const { data } = event.detail;
    $watcher.event = data;
    try {
      await postNewWatcher($watcher);
      state = STATES.SUCCESS;
    } catch (error) {
      console.error(error);
      state = STATES.ERROR;
    }
  }
</script>

<style>
</style>

<div class="container mx-auto">
  <div class="flex justify-center px-6 my-12 w-full ">
    {#if state === STATES.ERROR}
      <Error />
    {:else if state === STATES.SUCCESS}
      <Success />
    {:else if state === STATES.SELECT}
      <SelectEvent on:select={handleSelectEvent} data={$watcher.events} />
    {:else}
      <Form on:sendData={handleSendData} {errors} />
    {/if}
  </div>
</div>
