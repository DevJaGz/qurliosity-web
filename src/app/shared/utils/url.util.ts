export const removeDomainFromMessage = (message: string) => {
  const domainRegex = /https?:\/\/[^\/]+/;
  const result = message.replace(domainRegex, '');
  return result;
};
