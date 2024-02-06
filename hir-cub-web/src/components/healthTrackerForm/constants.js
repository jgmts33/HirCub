
export const painTypeList = [
  'Dull',
  'Aching',
  'Throbbing',
  'Burning/Shooting',
  'Stabbing',
  'Radiating',
  'Hard to describe',
];

export const problemCardList = [
  {
    title: 'Pain',
    symptomTitle: 'Pain',
    rootName: 'pain',
    typeId: 'pain',
    scaleText: {
      min: 'No pain',
      max: 'Worst possible pain',
    },
    suggestionConditions: {
      options: { '30': [35, 36], '60': [35, 36], '100': [35] },
    },
    description:`The best way to manage pain is to control it early.
        Pain can make people feel tired and nauseous, and it can affect their well- being.
        Starting pain medication won’t lessen its effect over time.
        Pain medications, such as morphine, can be used safely and effectively in palliative care for as long as needed. They don’t make death come sooner.
        Pain between doses of medicine is called “breakthrough pain.” Talk to your healthcare provider to ensure you are taking the right dose, and to discuss how to address breakthrough pain.
        If extra medicine is needed for breakthrough pain more than three times per day, the regular dose of pain medication may need to increase`,
  },
  {
    title: 'Tiredness',
    symptomTitle: 'Tiredness (a lack of energy)',
    rootName: 'tiredness',
    typeId: '1',
    scaleText: {
      min: 'Not tired',
      max: 'Worst possible tiredness',
    },
    suggestionConditions: {
      options: { '30': [45], '60': [45], '100': [45] },
    },
    description: `Tiredness is a lack of energy. It is different from drowsiness.
        Many things may cause tiredness, like pain, poor sleep, worry, depression, and illness. 
        Tiredness may result in feeling weak, run-down, and having difficulty concentrating or staying awake. 
        With serious illness, the feeling of tiredness may last for a long time and does not go away with sleep or rest.`,
  },
  {
    title: 'Drowsiness',
    symptomTitle: 'Drowsiness (feeling sleepy)',
    rootName: 'drowsiness',
    typeId: '2',
    scaleText: {
      min: 'Not drowsy',
      max: 'Worst possible drowsiness',
    },
    suggestionConditions: {
      options: { '30': [46], '60': [46], '100': [46] },
    },
    description: `Drowsiness is feeling very sleepy or unable to keep your eyes open. It is different from tiredness or a lack of energy. 
        A drowsy person might “nod off” at anytime – even in the middle of a conversation. 
        Drowsiness can occur for a variety of reasons, such as elevated calcium in the blood, elevated blood sugar, or the progress of the disease.
        Some drowsiness might be treatable. Contact the healthcare provider to discuss what is happening.`,
  },
  {
    title: 'Nausea',
    symptomTitle: 'Nausea',
    rootName: 'nausea',
    typeId: '3',
    scaleText: {
      min: 'No nausea',
      max: 'Worst possible nausea',
    },
    suggestionConditions: {
      options: { '30': [47], '60': [47], '100': [47] },
    },
    description: `Nausea is a sick or uncomfortable feeling and may include the urge to throw up. 
        It often affects a person’s appetite, well-being, and tiredness. 
        People might experience nausea if they are in pain or if they feel anxious.
        Nausea can also be caused by illness, medication, medical treatments, and constipation. 
        It is very important to discuss this symptom with the healthcare provider as it might be a sign of something more serious. `,
  },
  {
    title: 'Lack of appetite',
    symptomTitle: 'Lack of appetite',
    rootName: 'lackOfAppetite',
    typeId: '4',
    scaleText: {
      min: 'Best appetite',
      max: 'Worst possible lack of appetite',
    },
    suggestionConditions: {
      options: { '30': [48], '60': [48], '100': [48] },
    },
    description: `Appetite can be affected by pain, shortness of breath, anxiety, depression, nausea, and constipation. Sometimes addressing these can improve appetite. 
        Toward the end of life, appetite decreases and people lose weight, despite eating. This happens because the body can no longer use the energy and nutrients from food the same way it used to.
        Food at this stage might even make a person feel uncomfortably full, bloated, or nauseated.
        Often in the last days of life people stop eating and drinking.`,
  },
  {
    title: 'Shortness of breath',
    symptomTitle: 'Shortness of breath',
    rootName: 'shortnessOfBreath',
    typeId: '5',
    scaleText: {
      min: 'No shortness of breath',
      max: 'Worst possible shortness of breath',
    },
    suggestionConditions: {
      options: { '30': [49], '60': [49], '100': [49] },
    },
    description: `“Shortness of breath” describes how someone is feeling, not how they look. 
        Someone may appear comfortable but be very short of breath, or they may appear short of breath but say they are comfortable. 
        Shortness of breath can cause tiredness, decrease appetite, and increase anxiety. 
        Using oxygen, prescribing medicines for anxiety, modifying activity, finding comfortable positions, practicing relaxation techniques, or moving the air in the room by using a fan or opening a window can help with shortness of breath
        Medicines such as morphine, hydromorphone, and fentanyl help with “air hunger.” If someone is already on these medicines for pain, a higher dose may be needed to help with shortness of breath. 
        Some healthcare providers are hesitant to use pain medicine for shortness of breath, but research suggests that these medications can be very effective. `,
  },
  {
    title: 'Depression',
    symptomTitle: 'Depression (or feeling sad)',
    rootName: 'depression',
    typeId: '6',
    scaleText: {
      min: 'Not depressed',
      max: 'Worst possible depression',
    },
    suggestionConditions: {
      options: { '30': [50], '60': [50], '100': [50] },
    },
    description: `Depression is serious and can impact appetite, energy, and overall well-being. 
        Unfortunately, depression is often considered to be an expected and normal part of serious illness and might be ignored. Improvements in mood and energy are possible. 
        Talk with the healthcare provider about concerns, creating a plan, and in many cases, starting a medication to treat depression. `,
  },
  {
    title: 'Anxiety',
    symptomTitle: 'Anxiety (or feeling nervous)',
    rootName: 'anxiety',
    typeId: '7',
    scaleText: {
      min: 'No anxiety',
      max: 'Worst possible anxiety',
    },
    suggestionConditions: {
      options: { '30': [51], '60': [51], '100': [51] },
    },
    description: `Anxiety is described as “feeling nervous” and may include fear, uneasiness, and worry.
        Anxiety is a normal reaction to anything that threatens the person’s body, lifestyle, values, or those close to them. 
        Anxiety can affect the person physically and emotionally. 
        Anxiety might affect appetite, tiredness, and sense of well-being. 
        Pain and shortness of breath might also affect anxiety.
        It is very common to experience anxiety or feel scared when diagnosed with a life-limiting illness.
        It is important to speak with the healthcare provider so they can address what’s causing the anxiety and provide resources and supports`,
  },
  {
    title: 'Well Being',
    symptomTitle: 'Well being (how you feel overall?)',
    rootName: 'wellBeing',
    typeId: '8',
    scaleText: {
      min: 'The best you can feel',
      max: 'The worst you can feel',
    },
    suggestionConditions: {
      options: {},
    },
    description: `Well-being refers to how a person feels overall. It includes how the person is feeling physically and emotionally. 
        Pain, anxiety, and shortness of breath are a few of the physical symptoms that may affect well-being. 
        It is not uncommon to have concerning thoughts or feelings, like worry, about family, friends, and the illness. These can impact a sense of well-being. 
        It is important to discuss concerns with the healthcare provider.`,
  },
];
