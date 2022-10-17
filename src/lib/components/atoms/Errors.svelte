<script>
    export let errors = [];
</script>

{#if errors && errors.length >= 1}
    <div class="errors">
        {#each errors as error}
            <span class="error">
                {error}
            </span>
        {/each}
    </div>
{/if}

<style lang="scss">
  .errors {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .error {
      color: red;
      font-size: 14px;
    }
  }

</style>
