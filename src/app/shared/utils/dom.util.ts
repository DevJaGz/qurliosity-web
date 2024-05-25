export const cancelEvent = <T extends Event>(event: T) => {
  event?.stopPropagation();
  event?.preventDefault();
};
