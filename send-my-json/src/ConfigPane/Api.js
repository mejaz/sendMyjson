import React from 'react'
import { Modal, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import EmptyConfig from '../Empty/EmptyConfig'


function Api(props) {

  const httpProtocols = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ]

  const val = `{"qdua": {
     "categories": [   {
        "id": 19,
        "category_english": "Quran",
        "category_urdu": "القرآن",
        "topic": [      {
           "id": 59,
           "topic_english": "Rabbana Dua",
           "topic_urdu": "ربّنا دعا",
           "category_id": 19
        }]
     }],
     "qdua": {"59":    [
              {
           "id": 126,
           "dua": "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "127",
           "hadith_english": "NA",
           "translation_urdu": "ہمارے پروردگار! تو ہم سے قبول فرما، تو ہی سننے واﻻ اور جاننے واﻻ ہے",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "127",
           "hadith_urdu": "NA"
        },
              {
           "id": 127,
           "dua": "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You. And show us our rites and accept our repentance. Indeed, You are the Accepting of repentance, the Merciful.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "128",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! ہمیں اپنا فرمانبردار بنا لے اور ہماری اوﻻد میں سے بھی ایک جماعت کو اپنی اطاعت گزار رکھ اور ہمیں اپنی عبادتیں سکھا اور ہماری توبہ قبول فرما، تو توبہ قبول فرمانے واﻻ اور رحم وکرم کرنے واﻻ ہے",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "128",
           "hadith_urdu": "NA"
        },
              {
           "id": 128,
           "dua": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "201",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! ہمیں دنیا میں نیکی دے اور آخرت میں بھی بھلائی عطا فرما اور ہمیں عذاب جہنم سے نجات دے",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "201",
           "hadith_urdu": "NA"
        },
              {
           "id": 129,
           "dua": "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "250",
           "hadith_english": "NA",
           "translation_urdu": "اے پروردگار ہمیں صبر دے، ﺛابت قدمی دے اور قوم کفار پر ہماری مدد فرما",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "250",
           "hadith_urdu": "NA"
        },
              {
           "id": 130,
           "dua": "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, do not impose blame upon us if we have forgotten or erred",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "286",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! اگر ہم بھول گئے ہوں یا خطا کی ہو تو ہمیں نہ پکڑنا",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "286",
           "hadith_urdu": "NA"
        },
              {
           "id": 131,
           "dua": "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, and lay not upon us a burden like that which You laid upon those before us.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "286",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! ہم پر وه بوجھ نہ ڈال جو ہم سے پہلے لوگوں پر ڈاﻻ تھا",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "286",
           "hadith_urdu": "NA"
        },
              {
           "id": 132,
           "dua": "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.",
           "hadith_book_english": "Al-Baqarah (2)",
           "hadith_number_english": "286",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! ہم پر وه بوجھ نہ ڈال جس کی ہمیں طاقت نہ ہو اور ہم سے درگزر فرما! اور ہمیں بخش دے اور ہم پر رحم کر! تو ہی ہمارا مالک ہے، ہمیں کافروں کی قوم پر غلبہ عطا فرما",
           "hadith_book_urdu": "البَقَرَة (2)",
           "hadith_number_urdu": "286",
           "hadith_urdu": "NA"
        },
              {
           "id": 133,
           "dua": "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
           "hadith_book_english": "Aal-e-Imran (3)",
           "hadith_number_english": "8",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! ہمیں ہدایت دینے کے بعد ہمارے دل ٹیڑھے نہ کردے اور ہمیں اپنے پاس سے رحمت عطا فرما، یقیناً تو ہی بہت بڑی عطا دینے واﻻ ہے",
           "hadith_book_urdu": "آل عِمرَان (3)",
           "hadith_number_urdu": "8",
           "hadith_urdu": "NA"
        },
              {
           "id": 134,
           "dua": "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ",
           "repeat": 1,
           "topic_id": 59,
           "translation_english": "Our Lord, surely You will gather the people for a Day about which there is no doubt. Indeed, Allah does not fail in His promise.",
           "hadith_book_english": "Aal-e-Imran (3)",
           "hadith_number_english": "9",
           "hadith_english": "NA",
           "translation_urdu": "اے ہمارے رب! تو یقیناً لوگوں کوایک دن جمع کرنے واﻻ ہے جس کے آنے میں کوئی شک نہیں، یقیناً اللہ تعالیٰ وعده خلافی نہیں کرتا",
           "hadith_book_urdu": "آل عِمرَان (3)",
           "hadith_number_urdu": "9",
           "hadith_urdu": "NA"
        },`

  return (
    <>
      <Row>
        <Col>
          <div className='api-bar'>
            <div>
              Project Name
            </div>
            <div className='api-prog-bar'>
              <button className="flat-button" >
                <FaPencilAlt size={20} color={'#fff'}/>
              </button>
              <button className="flat-button" >
                <FaTrashAlt size={20} color={'#fff'}/>
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{padding: '1%'}}>
        <Col md={12}>
          {/* *** API Name *** */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">API Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="API Name"
              aria-describedby="basic-addon1"
              value="hello"
              style={{
                backgroundColor: '#fff', color: '#c4046b'
              }}
              readOnly
            />
          </InputGroup>

          {/* *** API Method *** */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Method</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Method"
              aria-describedby="basic-addon1"
              value="GET"
              style={{
                backgroundColor: '#fff', color: '#c4046b'
              }}
              readOnly
            />
          </InputGroup>

          {/* *** API *** */}
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">API</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="API"
              aria-describedby="basic-addon1"
              value="https://www.sendmyjson.com/23/GetMyBooksList-v5"
              style={{
                backgroundColor: '#fff', color: '#c4046b'
              }}
              readOnly
            />
          </InputGroup>

          {/* *** expected json response *** */}
          <hr />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Expected JSON Response</Form.Label>
            <Form.Control
              as="textarea"
              rows="11"
              className='api-json-response'
              placeholder="Paste your response here..."
              value={val}
            />
            {/* <p
              style={{
                backgroundColor: '#fff',
                color: '#c4046b',
                fontFamily: 'courier',
                'min-height': '30%',
                'max-height': '30%',
                overflow: 'auto'
              }}
              readOnly
            >{val}</p> */}
          </Form.Group>

        </Col>
      </Row>
    </>
  )
}

export default Api
