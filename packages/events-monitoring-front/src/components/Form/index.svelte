<script>
  export let errors = {
    address: false,
    email: false,
    abi: false,
  };
  import { createEventDispatcher } from "svelte";
  import { form } from "./store.js";

  const dispatch = createEventDispatcher();

  function onSendData() {
    dispatch("sendData", { data: $form });
  }
</script>

<div class=" w-full">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="example@example.com"
        bind:value={$form.email} />
      {#if errors.email}
        <p class="text-red-600">Invalid email</p>
      {/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
        Address
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="address"
        type="text"
        placeholder="0x00000000000"
        bind:value={$form.address} />
      {#if errors.address}
        <p class="text-red-600">Invalid address</p>
      {/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
        Address
      </label>
      <textarea
        placeholder=" ABI "
        class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        bind:value={$form.abi}
        name="abi" />
      {#if errors.abi}
        <p class="text-red-600">Invalid Abi</p>
      {/if}
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        on:click={onSendData}
        type="button">
        Next
      </button>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Manifold Finance
  </p>
</div>
