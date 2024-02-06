const programsAndServices = [
  { id: 0, name: 'Cancer Care Manitoba', active: true },
  { id: 1, name: 'Caregiving with Confidence', active: true },
  { id: 2, name: 'Palliative Manitoba', active: false },
  {
    id: 3,
    name: 'Palliative Manitoba Telephone Bereavement Support',
    active: true,
  },
  { id: 4, name: 'CancerChat Canada - Manitoba', active: false },
  { id: 5, name: 'Manitoba Home Care Program', active: true },
  { id: 6, name: 'Child and Adolescent MH Services', active: true },
  { id: 7, name: 'Cancer agency', active: true },
];

const questions = [
  { id: 1, text: 'How can I become a caregiver?' },
  { id: 2, text: 'Where can I learn how to change bed with someone in it?' },
  { id: 3, text: 'Where can I learn how to help with bathing?' },
  { id: 4, text: 'How should I talk to kids about serious illnesses?' },
  { id: 5, text: 'How can I manage my own stress?' },
  {
    id: 6,
    text:
      "Can I talk about illnness of the person I'm caring for to my friends?",
  },
];

const mockCategoryList = [
  { value: 'Childrens Specific Support', label: 'Childrens Specific Support' },
  { value: 'Disease Specific Support', label: 'Disease Specific Support' },
];

const mockProgramServices = [
  {
    'title': 'Provincial Health Services Authority MAiD Office',
    'address': '200-1333 W Broadway',
    'city': 'Vancouver',
    'state': 'BC',
    'postalCode': 'V6H 4C1',
    'phone': '1 844 851-MAID (6243)',
    'email': 'maidcco@phsa.ca',
    'link': 'http://www.phsa.ca/health-info/medical-assistance-in-dying',
    'description': '<b>Provincial Health Services Authority</b> provides offers information and resources about MAiD. Please see the resources linked on their page, or contact the Provincial Health Service Authority (PHSA) MAiD Office.',
  },
  {
    'title': 'Children Hospices',
    'address': 'Suite 400, Central City Tower 13450 – 102nd Avenue',
    'city': 'Surrey',
    'state': 'BC',
    'postalCode': 'V3T 0H1',
    'phone': '1 877 935-5669 604 587-4600',
    'email': 'mccc@fraserhealth.ca',
    'link': 'https://www.fraserhealth.ca/Service-Directory/Services/end-of-life/medical-assistance-in-dying#.YSUgsMYZO8V',
    'description': '<I>Children Hospices</I> provides information and online resources for adults who would like to explore the option of assisted dying. Topics include eligibility, options for end-of-life care, and steps to receive medical assistance in dying.',
  },
];

export { programsAndServices, questions, mockCategoryList, mockProgramServices };
