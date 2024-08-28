/**
 * @description: 滚动到顶部
 * @param {HTMLElement} element
 * @return {*}
 */
export default function scrollToTop(element: HTMLElement | null) {
    // const scrollTo = () => {
    //   scrollToTop(element);
    // };

    // let id: number | null = null;
    // if (element) {
    //   const sTop = element.scrollTop;
    //   if (sTop > 0) {
    //     id = window.requestAnimationFrame(scrollTo);
    //     previous = sTop - sTop / 8;
    //     element.scrollTop = previous;
    //   } else {
    //     if (id) {
    //       window.cancelAnimationFrame(id);
    //     }
    //   }
    // }
    if (element) {
        element.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}
