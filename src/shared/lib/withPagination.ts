export const withPagination = <T>(data: T[], page = '1', limit = '10') => {
  const intPage = parseInt(page)
  const intLimit = parseInt(limit)

  const startIndex = (intPage - 1) * intLimit
  const endIndex = intPage * intLimit

  return {
    data: data.slice(startIndex, endIndex),
    total: data.length,
    page: intPage,
    limit: intLimit,
  }
}
