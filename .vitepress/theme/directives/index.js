export const vOuterHtml = {
  mounted: (el, binding) => {
    el.outerHTML = binding.value
  },
}
