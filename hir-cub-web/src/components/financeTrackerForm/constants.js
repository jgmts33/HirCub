export const financeTabList = [
  {
    title: 'Medical Expenses Not Related to Travel',
    rootName: 'notRelatedTravel',
    typeId: '1',
    suggestionConditions: {
      options: { '30': [35, 36], '60': [35, 36], '100': [35] },
    },
  },
  {
    title: 'Medical Expenses Related to Travel',
    rootName: 'relatedTravel',
    typeId: '2',
    suggestionConditions: {
      options: { '30': [45], '60': [45], '100': [45] },
    },
  },
  {
    title: 'Other expenses ',
    rootName: 'otherExpenses',
    typeId: '3',
    suggestionConditions: {
      options: { '30': [46], '60': [46], '100': [46] },
    },
  },
  {
    title: 'Attendant Care ',
    rootName: 'attendantCare',
    typeId: '4',
    suggestionConditions: {
      options: { '30': [47], '60': [47], '100': [47] },
    },
  },
];

export const expenseList = [
  {
    value: '1',
    label: 'Prescribed drug',
  },
  {
    value: '2',
    label: 'Medication or other substance',
  },
  {
    value: '3',
    label: 'Services and fees',
  },
  {
    value: '4',
    label: 'Devices',
  },
  {
    value: '5',
    label: 'equipment',
  },
  {
    value: '6',
    label: 'supplies',
  },
  {
    value: '7',
    label: 'Attendant care',
  },
  {
    value: '8',
    label: 'Care',
  },
  {
    value: '9',
    label: 'Service animal',
  },
  {
    value: '10',
    label: 'Eligible food products',
  },
  {
    value: '11',
    label: 'Ineligible food products',
  },
  {
    value: '12',
    label: 'Other',
  },
];

export const travelList = [
  {
    value: '1',
    label: 'less than 40km',
  },
  {
    value: '2',
    label: 'at least 40km away',
  },
  {
    value: '3',
    label: 'less than 40km',
  },
];