import host from "../../../config/host";
import { mock } from "../../../config/mock";

if (host.enableMock) {
/*
    mock.onGet('/api/v1/foodx').reply(config => {
        const names = ['Socrates', 'Balzac', 'Plato'];
        const avatarSrc = [
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
        ];
        const imageSrc = [
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
        ];
        const data = new Array(15).fill(null).map((_, index) => {
            return {
                index: index,
                avatar: avatarSrc[index % avatarSrc.length],
                title: names[index % names.length],
                description: '',
                //'the round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider.        ',
                imageSrc: imageSrc[index % imageSrc.length],
            };
        });
        const dataSource = {
            page_num: config.params.page_num,
            page_size: config.params.page_size,
            data: data.slice((page_num-1)*page_size, page_num*page_size),
            total: data.length,
        }
        return [200, {
            code: 0,
            error: '',
            data: dataSource,
        }]
    }
    );

    mock.onGet('/api/v1/food').reply(config => {
        const rawData = [
            {
                id: 1,
                name: 'Angelica',
                description: 'Angelica is a genus of about 60 species of tall biennial and perennial herbs in the family Apiaceae, native to temperate and subarctic regions of the Northern Hemisphere, reaching as far north as Iceland and Lapland. They grow to 1鈥3 m tall, with large bipinnate leaves and large compound umbels of white or greenish-white flowers. Some species can be found in purple moor and rush pastures.',
                group: 'Herbs and Spices',
                scientific_name: 'Angelica keiskei',
            },
            {
                id: 2,
                name: 'Savoy cabbage',
                description: 'Savoy cabbage (Brassica oleracea convar. capitata var. sabauda L. ) is a variety of the cabbage, a cultivar of the plant species Brassica oleracea. Savoy cabbage is a winter vegetable. A variety of the savoy cabbage is the January King Cabbage. Savoy cabbage can be used in a variety of recipes. It pairs well with red wine, apples, spices, horseradish and meat. It can be used for roulades, in stews and soups, as well as roasted plain and drizzled with olive oil. Cabbage that is heavy for its size with leaves that are unblemished and have a bright, fresh look are signs of desirable quality. Whole cabbages are preferred whenever possible as pre-cut or preshredded cabbage has a greatly diminished vitamin content. Peak season for most cabbages runs from November through April. Fresh whole cabbage will keep in the refrigerator for one to six weeks depending on type and variety. Hard green, white or red cabbages will keep the longest while the looser Savoy and Chinese varieties need to be consumed more quickly. It is necessary to keep the outer leaves intact without washing when storing since moisture hastens decay. Cabbage provides fiber, vitamins A, C, K and B6, folate, potassium, manganese, thiamin, calcium, iron and magnesium.',
                group: 'Vegetables',
                scientific_name: 'Brassica oleracea var. sabauda',
            },
            {
                id: 3,
                name: 'Silver linden',
                description: 'Tilia tomentosa (Silver Lime in the UK and Silver Linden in the US) is a species of Tilia native to southeastern Europe and southwestern Asia, from Hungary and the Balkans east to western Turkey, occurring at moderate altitudes. It is a deciduous tree growing to 20鈥35 m tall, with a trunk up to 2 m diameter. The leaves are alternately arranged, rounded to triangular-ovate, 4鈥13聽cm long and broad with a 2.5鈥4聽cm petiole, green and mostly hairless above, densely white tomentose with white hairs below, and with a coarsely toothed margin. The flowers are pale yellow, hermaphrodite, produced in cymes of three to ten in mid to late summer with a pale green subtending leafy bract; they have a strong scent and are pollinated by honeybees. The nectar however contains sugars which cannot be digested by other bees, to whom the tree is somewhat toxic. The fruit is a dry nut-like drupe 8鈥10聽mm long, downy, and slightly ribbed.',
                group: 'Herbs and Spices',
                scientific_name: 'Tilia argentea',
            },
        ]
        const name = config.params.name;
        const pageNum = config.params.page_num;
        const pageSize = config.params.page_size;

        const data = new Array();
        rawData.forEach(element => {
            if (element.indexOf(name)>0) {
                data.push(element)
            }
        });
        const dataSource = {
            page_num: pageNum,
            page_size: pageSize,
            data: data.slice((pageNum-1)*pageSize, pageNum*pageSize),
            total: data.length,
        }
        return [200, {
            code: 0,
            error: '',
            data: dataSource,
        }]
    }
    );

    mock.onGet('/api/v1/food/disease').reply(config => {
        const rawData = [
            {
                id: 1,
                food_name: 'acerola',
                disease_name: 'aberrant crypt foci',
                association: 3.51,
                treatment: 0.51,
                inference_score: 0,
            },
            {
                id: 2,
                food_name: 'acerola',
                disease_name: 'abnormalities, drug-induced',
                association: 4.26,
                treatment: 1.17,
                inference_score: 0,
            },
            {
                id: 3,
                food_name: 'acerola',
                disease_name: 'acidosis',
                association: 3.5,
                treatment: 1.51,
                inference_score: 0,
            },
        ];
        let name = config.params.name;
        let pageNum = config.params.page_num;
        let pageSize = config.params.page_size;
        const data = new Array();
        rawData.forEach(element => {
            if (element.indexOf(name)>0) {
                data.push(element)
            }
        });
        let dataSource = {
            page_num: pageNum,
            page_size: pageSize,
            data: data.slice((pageNum-1)*pageSize, pageNum*pageSize),
            total: data.length,
        }
        return [200, {
            code: 0,
            error: '',
            data: dataSource,
        }]
    })

    mock.onGet('/api/v1/disease').reply(config => {
        const rawData = [
            {
                id: 1,
                name: 'aberrant crypt foci',
                mesh: 'MESH:D058739',
                description: 'Clusters of colonic crypts that appear different from the surrounding mucosa when visualized after staining. They are of interest as putative precursors to colorectal adenomas and potential biomarkers for colorectal carcinoma.',
                tree_numbers: 'C04.834.020',
            },
            {
                id: 2,
                name: 'abnormalities, drug-induced',
                mesh: 'MESH:D000014',
                description: 'Congenital abnormalities caused by medicinal substances or drugs of abuse given to or taken by the mother, or to which she is inadvertently exposed during the manufacture of such substances. The concept excludes abnormalities resulting from exposure to non-medicinal chemicals in the environment.',
                tree_numbers: 'C16.131.042',
            },
            {
                id: 3,
                name: 'acidosis',
                mesh: 'MESH:D000138',
                description: 'A pathologic condition of acid accumulation or depletion of base in the body. The two main types are RESPIRATORY ACIDOSIS and metabolic acidosis, due to metabolic acid build up.',
                tree_numbers: 'C18.452.076.176',
            },
        ]
        const name = config.params.name;
        const pageNum = config.params.page_num;
        const pageSize = config.params.page_size;

        const data = new Array();
        rawData.forEach(element => {
            if (element.indexOf(name)>0) {
                data.push(element)
            }
        });
        const filterData = data.slice((pageNum-1)*pageSize, pageNum*pageSize)
        const dataSource = {
            page_num: pageNum,
            page_size: pageSize,
            data: filterData,
            total: data.length,
        }
        return [200, {
            code: 0,
            error: '',
            data: dataSource,
        }]
    }
    );

    mock.onGet('/api/v1/disease/food').reply(config => {
        const rawData = [
            {
                id: 1,
                food_name: 'acerola',
                disease_name: 'aberrant crypt foci',
                association: 3.51,
                treatment: 0.51,
                inference_score: 0,
            },
            {
                id: 2,
                food_name: 'acerola',
                disease_name: 'abnormalities, drug-induced',
                association: 4.26,
                treatment: 1.17,
                inference_score: 0,
            },
            {
                id: 3,
                food_name: 'acerola',
                disease_name: 'acidosis',
                association: 3.5,
                treatment: 1.51,
                inference_score: 0,
            },
        ];
        let name = config.params.name;
        let pageNum = config.params.page_num;
        let pageSize = config.params.page_size;
        const data = new Array();
        rawData.forEach(element => {
            if (element.indexOf(name)>0) {
                data.push(element)
            }
        });
        let dataSource = {
            page_num: pageNum,
            page_size: pageSize,
            data: data.slice((pageNum-1)*pageSize, pageNum*pageSize),
            total: data.length,
        }
        return [200, {
            code: 0,
            error: '',
            data: dataSource,
        }]
    })
    */
}