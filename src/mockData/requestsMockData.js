// mock approval data
import harrison from '../images/approvals/harrison.png';
import second from '../images/approvals/second.png';
import third from '../images/approvals/third.png';
import fourth from '../images/approvals/fourth.png';
import fifth from '../images/approvals/fifth.png';

const requestsData = {
  requests:[
    {
      'id':'745923RTF',
      'destination':'Lagos',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open',
      'name':'Harrison Maina',
      'image':harrison
    },
    {
      'id':'645923RTF',
      'destination':'New York',
      'origin':'Lagos',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open',
      'name':'Collins Njau',
      'image': second
    },
    {
      'id':'545923RTF',
      'destination':'New York',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open',
      'name':'Harriet Mwangi',
      'image':'none'
    },
    {
      'id':'345923RTF',
      'destination':'Kampala',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved',
      'name':'Janet Kanini',
      'image':third
    },
    {
      'id':'245923RTF',
      'destination':'Lagos',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved',
      'name':'Jomo Kenyatta',
      'image':'null'
    },
    {
      'id':'245623RTF',
      'destination':'New York',
      'origin':'Lagos',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved',
      'name':'Tabitha Karanu',
      'image':fourth
    },
    {
      'id':'145924RTF',
      'destination':'Kampala',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved',
      'name':'Njau Muru',
      'image':fifth
    }
  ],
  pagination: {
    currentPage: 1,
    pageCount: 5
  }
};

export default requestsData;
