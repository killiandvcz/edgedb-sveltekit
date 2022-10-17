<script>
    import Errors from "$lib/components/atoms/form/Errors.svelte";

    export let errors;
    export let flex;
    export let label;
</script>


<div class="_input" style="{flex ? 'flex: ' + flex : ''}">
    <div class="top">
        {#if label}
            <span class="label">{label}</span>
            <div class="actions">
                <slot name="actions"></slot>
            </div>
        {/if}
    </div>

    <slot></slot>
    <Errors errors={errors} />
</div>

<style lang="scss">
  ._input{
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 7px;
    .top{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .label{
        font-size: 12px;
        font-weight: bold;
        color: black;

      }
    }

  }
</style>