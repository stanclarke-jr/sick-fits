/* eslint-disable no-plusplus */
import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false, // Tells Apollo we will take care of everything
  read(itemsInCache = [], { args, cache }) {
    const { skip, first } = args;

    // Read the number of items on the page from the cache
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pageCount = Math.ceil(count / first);

    // Check if we have items in the cache
    const items = itemsInCache.slice(skip, skip + first).filter((item) => item);

    if (items.length && items.length !== first && page === pageCount)
      return items;
    if (items.length !== first) return false; // No items? Fetch them.

    // If there are items in the cache, return them from the cache.
    if (items.length) return items;
    return false; // Fallback to network request
  },
  merge(itemsInCache, fetchedItems, { args }) {
    const { skip } = args;
    // This runs when the Apollo client comes back from the network with out product(s)
    console.log(`Merging ${fetchedItems.length} item(s) from the network`);
    const mergedItems = itemsInCache ? itemsInCache.slice(0) : [];

    for (let i = skip; i < skip + fetchedItems.length; ++i) {
      mergedItems[i] = fetchedItems[i - skip];
    }
    console.log(mergedItems);
    // Finally return the merged items from the cache
    return mergedItems;
  },
});

export default paginationField;
