const regionMap = {
    'ID-BA': 'Bali',
    'ID-NB': 'Nusa Tenggara Barat',
    'ID-BT': 'Banten',
    'ID-JT': 'Jawa Tengah',
    'ID-JB': 'Jawa Barat',
    'ID-KT': 'Kalimantan Tengah',
    'ID-KS': 'Kalimantan Selatan',
    'ID-KB': 'Kalimantan Barat',
    'ID-ST': 'Sulawesi Tengah',
    'ID-GO': 'Gorontalo',
    'ID-SA': 'Sulawesi Utara',
    'ID-SN': 'Sulawesi Selatan',
    'ID-SG': 'Sulawesi Tenggara',
    'ID-SR': 'Sulawesi Barat',
    'ID-AC': 'Aceh',
    'ID-BE': 'Bengkulu',
    'ID-JA': 'Jambi',
    'ID-LA': 'Lampung',
    'ID-RI': 'Riau',
    'ID-SB': 'Sumatera Barat',
    'ID-SS': 'Sumatera Selatan',
    'ID-SU': 'Sumatera Utara',
    'ID-NT': 'Nusa Tenggara Timur',
    'ID-MA': 'Maluku',
    'ID-MU': 'Maluku Utara',
    'ID-JI': 'Jawa Timur',
    'ID-BB': 'Kepulauan Bangka Belitung',
    'ID-KR': 'Kepulauan Riau',
    'ID-PA': 'Papua',
    'ID-PB': 'Papua Barat',
    'ID-KI': 'Kalimantan Timur',
    'ID-KU': 'Kalimantan Utara',
    'ID-YO': 'Daerah Istimewa Yogyakarta',
    'ID-JK': 'Daerah Khusus Ibukota Jakarta'
  };
  
  export const regions = (instanceRegionCode) => {
      if (instanceRegionCode in regionMap) {
          return regionMap[instanceRegionCode];
      } else {
          return null;
      }
  };