
// BMES醫環	生醫工程及環境科學館	Biomedical Engineering and Environmental Sciences Building
// CC計中	第二綜合大樓(計通中心)	General Building II (Computer & Communication Center)
// CHE化工	化工館	Chemical Engineering Building
// CHEM化	化學館	Chemistry Building
// CHEM II化二	動機化學實驗館(化學二館)	Chemistry and Power Mechanical Engineering Building
// Counsel 諮商	醫輔中心	Clinic and Counseling Center
// DELTA 台達	台達館	Delta Building
// D-Ren 仁齋	仁齋	Dormitory Ren
// D-Shi 實齋	實齋	Dormitory Shi
// EDU 教	教育館	Education Building
// EECS資電	資訊電機館	Electrical Engineering and Computer Science Building
// ENG I 工一	工程一館	Engineering Building I
// ESS 工科	工科館	Engineering and System Science Building
// GEN I 綜一	第一綜合大樓	General Building I
// GEN II 綜二	第二綜合大樓	General Building II
// GEN III 綜三	第三綜合大樓	General Building III
// GEN IV 綜四	第四綜合大樓	General Building IV
// HSS 人社	人文社會學院	Humanities and Social Sciences Building
// LS I  生一	生命科學一館	Life Science Building I
// LS II 生二	生命科學二館	Life Science Building II
// LTM 綠能	綠能大樓(李存敏館)	Lee Tsen Min Building
// MS 材料	材料科技館	Materials Science and Technology Building
// MSLAB 材實	材料實驗館	Materials Science Laboratory
// MXIC 旺宏	旺宏館(學習資源中心)	MXIC Building(Learning Resource Center)
// NTHU Lab 清實	清華實驗室	Tsing Hua Laboratory
// PHYS 物	物理館	Physics Building
// PHYSLAB 普實	普物實驗館	Physics Laboratory
// STC 蒙民	學生活動中心	Student Union
// TSMC 台積	台積館	TSMC Building
// SINICA 中研院	北市南港區中研院	Academia Sinica
// Nanda 南大	南大校區	Nanda Campus
// VC 虛擬教室	線上進行課程,無實體教室	Virtual classroom
export type RoomDefinition = {
    prefix: string;
    code: {
        chinese: string;
        english: string;
    };
    building: {
        chinese: string;
        english: string;
    };
}

const buildings: RoomDefinition[] = [
    {
        prefix: 'BMES醫環',
        code: {
            chinese: '醫環',
            english: 'BMES'
        },
        building: {
            chinese: '生醫工程及環境科學館',
            english: 'Biomedical Engineering and Environmental Sciences Building'
        }
    },
    {
        prefix: 'CC計中',
        code: {
            chinese: '計中',
            english: 'CC'
        },
        building: {
            chinese: '第二綜合大樓(計通中心)',
            english: 'General Building II (Computer & Communication Center)'
        }
    },
    {
        prefix: 'CHE化工',
        code: {
            chinese: '化工',
            english: 'CHE'
        },
        building: {
            chinese: '化工館',
            english: 'Chemical Engineering Building'
        }
    },
    {
        prefix: 'CHEM化',
        code: {
            chinese: '化',
            english: 'CHEM'
        },
        building: {
            chinese: '化學館',
            english: 'Chemistry Building'
        }
    },
    {
        prefix: 'CHEM II化二',
        code: {
            chinese: '化二',
            english: 'CHEM II'
        },
        building: {
            chinese: '動機化學實驗館(化學二館)',
            english: 'Chemistry and Power Mechanical Engineering Building'
        }
    },
    {
        prefix: 'Counsel諮商',
        code: {
            chinese: '諮商',
            english: 'Counsel'
        },
        building: {
            chinese: '醫輔中心',
            english: 'Clinic and Counseling Center'
        }
    },
    {
        prefix: 'DELTA台達',
        code: {
            chinese: '台達',
            english: 'DELTA'
        },
        building: {
            chinese: '台達館',
            english: 'Delta Building'
        }
    },
    {
        prefix: 'D-Ren仁齋',
        code: {
            chinese: '仁齋',
            english: 'D-Ren'
        },
        building: {
            chinese: '仁齋',
            english: 'Dormitory Ren'
        }
    },
    {
        prefix: 'D-Shi實齋',
        code: {
            chinese: '實齋',
            english: 'D-Shi'
        },
        building: {
            chinese: '實齋',
            english: 'Dormitory Shi'
        }
    },
    {
        prefix: 'EDU教',
        code: {
            chinese: '教',
            english: 'EDU'
        },
        building: {
            chinese: '教育館',
            english:
                'Education Building'
        }
    },
    {
        prefix: 'EECS資電',
        code: {
            chinese: '資電',
            english: 'EECS'
        },
        building: {
            chinese: '資訊電機館',
            english: 'Electrical Engineering and Computer Science Building'
        }
    },
    {
        prefix: 'ENG I工一',
        code: {
            chinese: '工一',
            english: 'ENG I'
        },
        building: {
            chinese: '工程一館',
            english: 'Engineering Building I'
        }
    },
    {
        prefix: 'ESS工科',
        code: {
            chinese: '工科',
            english: 'ESS'
        },
        building: {
            chinese: '工科館',
            english: 'Engineering and System Science Building'
        }
    },
    {
        prefix: 'GEN I綜一',
        code: {
            chinese: '綜一',
            english: 'GEN I'
        },
        building: {
            chinese: '第一綜合大樓',
            english: 'General Building I'
        }
    },
    {
        prefix: 'GEN II綜二',
        code: {
            chinese: '綜二',
            english: 'GEN II'
        },
        building: {
            chinese: '第二綜合大樓',
            english: 'General Building II'
        }
    },
    {
        prefix: 'GEN III綜三',
        code: {
            chinese: '綜三',
            english: 'GEN III'
        },
        building: {
            chinese: '第三綜合大樓',
            english: 'General Building III'
        }
    },
    {
        prefix: 'GEN IV綜四',
        code: {
            chinese: '綜四',
            english: 'GEN IV'
        },
        building: {
            chinese: '第四綜合大樓',
            english: 'General Building IV'
        }
    },
    {
        prefix: 'HSS人社',
        code: {
            chinese: '人社',
            english: 'HSS'
        },
        building: {
            chinese: '人文社會學院',
            english: 'Humanities and Social Sciences Building'
        }
    },
    {
        prefix: 'LS I生一',
        code: {
            chinese: '生一',
            english: 'LS I'
        },
        building: {
            chinese: '生命科學一館',
            english: 'Life Science Building I'
        }
    },
    {
        prefix: 'LS II生二',
        code: {
            chinese: '生二',
            english: 'LS II'
        },
        building: {
            chinese: '生命科學二館',
            english: 'Life Science Building II'
        }
    },
    {
        prefix: 'LTM綠能',
        code: {
            chinese: '綠能',
            english: 'LTM'
        },
        building: {
            chinese: '綠能大樓(李存敏館)',
            english: 'Lee Tsen Min Building'
        }
    },
    {
        prefix: 'MS材料',
        code: {
            chinese: '材料',
            english: 'MS'
        },
        building: {
            chinese: '材料科技館',
            english: 'Materials Science and Technology Building'
        }
    },
    {
        prefix: 'MSLAB材實',
        code: {
            chinese: '材實',
            english: 'MSLAB'
        },
        building: {
            chinese: '材料實驗館',
            english: 'Materials Science Laboratory'
        }
    },
    {
        prefix: 'MXIC旺宏',
        code: {
            chinese: '旺宏',
            english: 'MXIC'
        },
        building: {
            chinese: '旺宏館(學習資源中心)',
            english: 'MXIC Building(Learning Resource Center)'
        }
    },
    {
        prefix: 'NTHU Lab清實',
        code: {
            chinese: '清實',
            english: 'NTHU Lab'
        },
        building: {
            chinese: '清華實驗室',
            english: 'Tsing Hua Laboratory'
        }
    },
    {
        prefix: 'PHYS物',
        code: {
            chinese: '物',
            english: 'PHYS'
        },
        building: {
            chinese: '物理館',
            english: 'Physics Building'
        }
    },
    {
        prefix: 'PHYSLAB普實',
        code: {
            chinese: '普實',
            english: 'PHYSLAB'
        },
        building: {
            chinese: '普物實驗館',
            english: 'Physics Laboratory'
        }
    },
    {
        prefix: 'STC蒙民',
        code: {
            chinese: '蒙民',
            english: 'STC'
        },
        building: {
            chinese: '學生活動中心',
            english: 'Student Union'
        }
    },
    {
        prefix: 'TSMC台積',
        code: {
            chinese: '台積',
            english: 'TSMC'
        },
        building: {
            chinese: '台積館',
            english: 'TSMC Building'
        }
    },
    {
        prefix: 'SINICA中研院',
        code: {
            chinese: '中研院',
            english: 'SINICA'
        },
        building: {
            chinese: '北市南港區中研院',
            english: 'Academia Sinica'
        }
    },
    {
        prefix: 'Nanda南大',
        code: {
            chinese: '南大',
            english: 'Nanda'
        },
        building: {
            chinese: '南大校區',
            english: 'Nanda Campus'
        }
    },
    {
        prefix: 'VC虛擬教室',
        code: {
            chinese: '虛擬教室',
            english: 'VC'
        },
        building: {
            chinese: '線上進行課程,無實體教室',
            english: 'Virtual classroom'
        }
    },
];

export { buildings };