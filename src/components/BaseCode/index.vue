<template>
  <pre
    class="hljs base-code"
  ><code class="language-json" ref="codeRef"></code></pre>
</template>
<script setup lang="ts">
import hljs from "highlight.js/es/common.js";
import "highlight.js/styles/a11y-dark.css";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
});
const codeRef = ref<HTMLElement | undefined>();
const init = () => {
  if (codeRef.value) {
    codeRef.value.innerHTML = props.code;
    hljs.initHighlightingOnLoad();
  }
};

watch([props.code], init);
onMounted(init);
</script>
