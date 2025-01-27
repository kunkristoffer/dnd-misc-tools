export function urlExtractDomainName(url: string) {
  const domain = url.replace(/.+\/\/|www.|\..+/g, '')
  return domain ?? "link"
}