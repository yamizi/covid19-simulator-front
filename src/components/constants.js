export const countries = [
    "Afghanistan",
    "Angola",
    "Argentina",
    "Austria",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belgium",
    "Belize",
    "Benin",
    "Bolivia",
    "Botswana",
    "Brazil",
    "Bulgaria",
    "Burkina Faso",
    "Cameroon",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Denmark",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Estonia",
    "Finland",
    "France",
    "Gabon",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Honduras",
    "Hungary",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Lebanon",
    "Libya",
    "Luxembourg",
    "Malaysia",
    "Mali",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Mongolia",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Rwanda",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Singapore",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Tanzania",
    "Thailand",
    "Turkey",
    "Uganda",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Vietnam",
    "Zambia",
    "Zimbabwe",
]

export const scenarios = [
    {
        id: "scenario-brutal-exit",
        mitigations: [
            //{id:0, measure:"Essential groceries",date:"2020-05-11",value:100},
            { id: 1, measure: "Workplaces", date: "2020-05-11", value: 100 },
            //{id:2, measure:"School & Universities",date:"2020-05-11",value:100},
            {
                id: 3,
                measure: "Parks & outdoor activities",
                date: "2020-05-11",
                value: 100,
            },
            {
                id: 4,
                measure: "Public transport",
                date: "2020-05-11",
                value: 100,
            },
            {
                id: 5,
                measure: "Retail & Recreation",
                date: "2020-05-11",
                value: 100,
            },
            //{id:6, measure:"International travels",date:"2020-05-11",value:100}
        ],
    },
    /* {
        id: "scenario-brutal-exit-closed-borders",
        mitigations: [
            { id: 0, measure: "Essential groceries", date: "2020-05-11", value: 100 },
            { id: 1, measure: "Workplaces", date: "2020-05-11", value: 100 },
            //{id:2, measure:"School & Universities",date:"2020-05-11",value:100},
            { id: 3, measure: "Parks & outdoor activities", date: "2020-05-11", value: 100 },
            { id: 4, measure: "Public transport", date: "2020-05-11", value: 100 },
            { id: 5, measure: "Retail & Recreation", date: "2020-05-11", value: 100 },
            //{id:6, measure:"International travels",date:"2020-05-11",value:0}
        ]
    }, */
    {
        id: "scenario-cyclic-exit",
        mitigations: [
            //{id:0, measure:"Essential groceries",date:"2020-05-11",value:100},
            { id: 1, measure: "Workplaces", date: "2020-05-11", value: 100 },
            //{id:2, measure:"School & Universities",date:"2020-05-11",value:100},
            {
                id: 3,
                measure: "Parks & outdoor activities",
                date: "2020-05-11",
                value: 100,
            },
            {
                id: 4,
                measure: "Public transport",
                date: "2020-05-11",
                value: 100,
            },
            {
                id: 5,
                measure: "Retail & Recreation",
                date: "2020-05-11",
                value: 100,
            },
            //{id:6, measure:"International travels",date:"2020-05-11",value:100},

            {
                id: 7,
                measure: "Essential groceries",
                date: "2020-06-08",
                value: 20,
            },
            { id: 8, measure: "Workplaces", date: "2020-06-08", value: 20 },
            //{id:9, measure:"School & Universities",date:"2020-06-08",value:0},
            {
                id: 10,
                measure: "Parks & outdoor activities",
                date: "2020-06-08",
                value: 0,
            },
            {
                id: 11,
                measure: "Public transport",
                date: "2020-06-08",
                value: 0,
            },
            {
                id: 12,
                measure: "Retail & Recreation",
                date: "2020-06-08",
                value: 0,
            },
            //{id:13, measure:"International travels",date:"2020-06-08",value:0},

            //{id:14, measure:"Essential groceries",date:"2020-07-06",value:100},
            { id: 15, measure: "Workplaces", date: "2020-07-06", value: 100 },
            //{id:16, measure:"School & Universities",date:"2020-07-06",value:100},
            {
                id: 17,
                measure: "Parks & outdoor activities",
                date: "2020-07-06",
                value: 100,
            },
            {
                id: 18,
                measure: "Public transport",
                date: "2020-07-06",
                value: 100,
            },
            {
                id: 19,
                measure: "Retail & Recreation",
                date: "2020-07-06",
                value: 100,
            },
            //{id:20, measure:"International travels",date:"2020-07-06",value:100},

            //{id:21, measure:"Essential groceries",date:"2020-08-03",value:20},
            { id: 22, measure: "Workplaces", date: "2020-08-03", value: 20 },
            //{id:23, measure:"School & Universities",date:"2020-08-03",value:0},
            {
                id: 24,
                measure: "Parks & outdoor activities",
                date: "2020-08-03",
                value: 0,
            },
            {
                id: 25,
                measure: "Public transport",
                date: "2020-08-03",
                value: 0,
            },
            {
                id: 26,
                measure: "Retail & Recreation",
                date: "2020-08-03",
                value: 0,
            },
            //{id:27, measure:"International travels",date:"2020-08-03",value:0},

            //{id:28, measure:"Essential groceries",date:"2020-09-07",value:100},
            { id: 29, measure: "Workplaces", date: "2020-09-07", value: 100 },
            //{id:30, measure:"School & Universities",date:"2020-09-07",value:100},
            {
                id: 31,
                measure: "Parks & outdoor activities",
                date: "2020-09-07",
                value: 100,
            },
            {
                id: 32,
                measure: "Public transport",
                date: "2020-09-07",
                value: 100,
            },
            {
                id: 33,
                measure: "Retail & Recreation",
                date: "2020-09-07",
                value: 100,
            },
            //{id:34, measure:"International travels",date:"2020-09-07",value:100}
        ],
    },
]



export const rebornScenarios = [
    {
        id: "Full-lockdown",
        mitigations: [
            { id: 0, measure: "Belgium border", date: getTodaysDate(), value: 100, label:'Close' },
            { id: 1, measure: "French border", date: getTodaysDate(), value: 100, label:'Close' },
            { id: 2, measure: "German border", date: getTodaysDate(), value: 100, label:'Close' },
            { id: 3, measure: "Schools", date: getTodaysDate(), value: 100, label:'Close' },
            { id: 4, measure: "Public Gathering", date: getTodaysDate(), value: 100, label:'No' },
            { id: 5, measure: "Private Social Gathering", date: getTodaysDate(), value: 0, label:'None' },
            { id: 6, measure: "Parks", date: getTodaysDate(), value: 100, label:'Close' },
            { id: 7, measure: "Travel allowed", date: getTodaysDate(), value: 100, label:'No' },
            { id: 8, measure: "Economic Activity Restriction", date: getTodaysDate(), value: 50, label:'Full' },
            { id: 9, measure: "Strict Respect of Government Measures", date: getTodaysDate(), value: 0, label:'Yes' },
            { id: 10, measure: "Number of persons vaccinated per week", value:0, label:0 },
        ],
    }
    ,{
        id: "No-lockdown",
        mitigations: [
            { id: 0, measure: "Belgium border", date: getTodaysDate(), value: 0, label:'Open' },
            { id: 1, measure: "French border", date: getTodaysDate(), value: 0, label:'Open' },
            { id: 2, measure: "German border", date: getTodaysDate(), value: 0, label:'Open' },
            { id: 3, measure: "Schools", date: getTodaysDate(), value: 0, label:'Open' },
            { id: 4, measure: "Public Gathering", date: getTodaysDate(), value: 0, label:'Yes' },
            { id: 5, measure: "Private Social Gathering", date: getTodaysDate(), value: 100, label:'No R' },
            { id: 6, measure: "Parks", date: getTodaysDate(), value: 0, label:'Open' },
            { id: 7, measure: "Travel allowed", date: getTodaysDate(), value: 0, label:'Yes' },
            { id: 8, measure: "Economic Activity Restriction", date: getTodaysDate(), value: 0, label:'None' },
            { id: 9, measure: "Strict Respect of Government Measures", date: getTodaysDate(), value: 0, label:'Yes' },
            { id: 10, measure: "Number of persons vaccinated per week", value:0, label:0 }
        ],
    }
    
]



export const measureTypes = [
    //{ id: "S1_School closing", value: "School & Universities" },
    //{ id: "S7_International travel controls", value: "International travels" },
    { id: "parks", value: "Parks & outdoor activities" },
    //{ id: "grocery/pharmacy", value: "Essential groceries" },
    { id: "transit_stations", value: "Public transport" },
    { id: "retail/recreation", value: "Retail & Recreation" },
    { id: "workplace", value: "Workplaces" },
]

export const RebornMeasureTypes = [
    { id: "b_be", value: "Belgium border" },
    { id: "b_fr", value: "French border" },
    { id: "b_de", value: "German border" },
    { id: "schools", value: "Schools" },
    { id: "public_gath", value: "Public Gathering" },
    { id: "private_gath", value: "Private Social Gathering" },
    { id: "park", value: "Parks" },
    { id: "travel", value: "Travel allowed" },
    { id: "activity_restr", value: "Economic Activity Restriction" },
    { id: "resp_gov_measure", value: "Strict Respect of Government Measures" },
    { id: "vaccinated_peer_week", value: "Number of persons vaccinated per week" }
    
]

function getTodaysDate(){
    let date = new Date();
    let month = (date.getMonth() + 1) < 10? '0' + (date.getMonth() + 1): (date.getMonth() + 1);
    let day = date.getDate() < 10? '0' + date.getDate(): date.getDate();

    return date.getFullYear() + '-' + month +'-' + day;
}

export const defaultRebornMeasureTypes = [
    { id: 0, measure: "Belgium border", value:0, label:'Open' },
    { id: 1, measure: "French border", value:0, label:'Open' },
    { id: 2, measure: "German border", value:0, label:'Open' },
    { id: 3, measure: "Schools", value:0, label:'Open' },
    { id: 4, measure: "Public Gathering", value:0, label:'Yes' },
    { id: 5, measure: "Private Social Gathering", value:100, label:'No R' },
    { id: 6, measure: "Parks", value:0, label:'Open' },
    { id: 7, measure: "Travel allowed", value:0, label:'Yes' },
    { id: 8, measure: "Economic Activity Restriction", value:0, label:'None' },
    { id: 9, measure: "Strict Respect of Government Measures", value:0, label:'Yes' },
    { id: 10, measure: "Number of persons vaccinated per week", value:0, label:0 },
]

export const rebornMeasureToApiMeasures = {
    "Belgium border": "b_be",
    "French border": "b_fr",
    "German border": "b_de",
    "Schools": "schools_m",
    "Public Gathering": "public_gath",
    "Private Social Gathering": "private_gath",
    "Parks": "parks_m",
    "Travel allowed": "travel_m",
    "Economic Activity Restriction": "activity_restr",
    "Strict Respect of Government Measures": "resp_gov_measure",
    "Number of persons vaccinated per week": "vaccinated_peer_week"
}

// TODO Savoir ce qu'est `scocial` dist pour la page web.
export const marksToApiValue = {
    "schools_m": {
        'open': "open",
        'owsd': "partial",
        'po': "preventive_measure",
        'close': "close"
    },
    "private_gath": {
        'none': 0,
        '5p': 5,
        '10p': 10,
        '20p': 20,
        'no r': 1000
    },
    "social_dist": ["yes", "no"],
    "parks_m": { 'open': "yes", 'close': "no" },    
    "activity_restr": {
        'none': "open",
        'full': "close",    
        'mixed': "mixed"
    }
}

export const allSectors = ["R_A", "R_B", "R_C", "R_D", "R_E", "R_F", "R_G", "R_H", "R_I", "R_J", "R_K", "R_L", 
                           "R_M", "R_N", "R_O", "R_P", "R_Q", "R_S", "R_T", "R_U"];


export const code_to_name = {
    "R_A":"AGRICULTURE, FORESTRY AND FISHING",
    "R_B":'MINING AND QUARRYING',
    "R_C": "MANUFACTURING",
    "R_D":"ELECTRICITY, GAS, STEAM AND AIR CONDITIONING SUPPLY",
    "R_E":"WATER SUPPLY, SEWERAGE AND WASTE MANAGEMENT",  //complete name: WATER SUPPLY; SEWERAGE, WASTE MANAGEMENT AND REMEDIATION ACTIVITIES
    "R_F":"CONSTRUCTION",
    "R_G":"WHOLESALE AND RETAIL TRADE...",
    "R_H":"TRANSPORTATION AND STORAGE",
    "R_I":"HORECA",
    "R_J":"INFORMATION AND COMMUNICATION",
    "R_K":"FINANCIAL AND INSURANCE ACTIVITIES",
    "R_L":"REAL ESTATE ACTIVITIES",
    "R_M":"PROFESSIONAL, SCIENTIFIC AND TECHNICAL ACTIVITIES",
    "R_N":"ADMINISTRATIVE SERVICES",
    "R_O":"PUBLIC ADMINISTRATION AND DEFENCE",
    "R_P":"EDUCATION",
    "R_Q":"HUMAN HEALTH AND SOCIAL WORK ACTIVITIES",
    "R_S":"OTHER SERVICE ACTIVITIES",
    "R_T":"Household activities.",
    "R_U":"ACTIVITIES OF EXTRATERRITORIAL ORGANISATIONS AND BODIES",
};
