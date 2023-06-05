<script lang="ts">
    export let type: "button" | "submit" = "button";
    export let className = "";
    export let data = {};
</script>

<button on:click class={className} {type} {...data}>
    <slot></slot>
</button>

<style lang="scss">
    button {
        all: unset;
        font-size: 1.3em;
        padding: 0.3em 0.3em;
        margin-top: 0.1em;
        transition: background-color 0.1s ease-in-out;

        &.success {
            background-color: darkgreen;
        }

        &.danger {
            background-color: darkred;
        }

        &.round {
            border-radius: 1em;
        }

        &.small {
            font-size: 0.9em;
        }

        &.large {
            font-size: 3em;
        }

        &:hover, &:focus {
            background-color: #8b8d00;
            cursor: pointer;
            color: #202020;
        }
    }
</style>