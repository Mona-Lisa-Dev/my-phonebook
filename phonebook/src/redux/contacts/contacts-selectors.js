import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoadingContacts = state => state.contacts.loading;
export const getError = state => state.contacts.error;

export const getContactsToShow = createSelector(
  [getContacts, getFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

// export const getContactsToShow = state => {
//   const items = getContacts(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   return items.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter),
//   );
// };
