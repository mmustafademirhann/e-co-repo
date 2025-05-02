// Import all image assets
import kari1 from './assets/kari1.png';
import sarikiz from './assets/sarikiz.png';
import sapkali from './assets/sapkali.png';
import zrgn from './assets/zrgn.png';
import sin2 from './assets/sin2.png';
import siyh from './assets/siyh.png';
import kzn from './assets/kzn.png';
import cokiyi from './assets/cokiyi.png';
import etekli from './assets/etekli.png';
import cncn from './assets/cncn.png';
import lll from './assets/lll.png';
import afgn from './assets/afgn.png';
import uiii from './assets/uiii.png';
import rng from './assets/rng.png';

export const carouselImages = [
    {
      src: kari1,
      alt: "Yeni Ürünler",
      caption: "Yeni Koleksiyon",
      description: "2025 için en yeni teknoloji ürünlerimiz"
    },
    {
      src: kari1,
      alt: "İndirimli Ürünler",
      caption: "Büyük İndirim",
      description: "Seçili ürünlerde %50'ye varan indirimler"
    },
    {
      src: kari1,
      alt: "Premium Ürünler",
      caption: "Premium Serisi",
      description: "En kaliteli ve lüks ürünlerimiz"
    }
  ];
  export const categories = [
    {
      id: 1,
      title: "Kadın",
      src: sarikiz,
      layoutSlot: "women" // Tam olarak "women" mu?
    },
    {
      id: 2,
      title: "Erkek",
      src: sapkali,
      layoutSlot: "men" // Tam olarak "men" mu?
    },
    {
      id: 3,
      title: "Çocuk",
      src: zrgn,
      layoutSlot: "kids" // Tam olarak "kids" mu?
    },
    {
      id: 4,
      title: "Aksesuar",
      src: sin2,
      layoutSlot: "accessories" // Tam olarak "accessories" mu?
    }
  ];
  export const productsImages = [
    {
      id: 1,
      title: "Ürün 1",
      src: siyh,
      description: "Bu ürün çok şık ve kullanışlı.",
      price: 199.99
    },
    {
      id: 2,
      title: "Ürün 2",
      src: kzn,
      description: "Kaliteli malzemeden üretilmiştir.",
      price: 249.50
    },
    {
      id: 3,
      title: "Ürün 3",
      src: cokiyi,
      description: "En çok satan modelimiz.",
      price: 179.00
    },
    {
      id: 4,
      title: "Ürün 4",
      src: etekli,
      description: "Sınırlı stokta, acele edin!",
      price: 299.90
    }
  ];
  export const heroData = {
    image: cncn,
    season: "SUMMER 2020",
    title: "Part of the Neural Universe",
    description: "We know how large objects will act, but things on a small scale.",
    primaryBtn: "BUY NOW",
    secondaryBtn: "READ MORE"
  };
  

  export const mockPosts = [
    {
        image: lll,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'intégral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
    {
        image: cncn,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'intégral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
    {
        image: cncn,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'intégral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
  ];
  export const productsForShopPage = [
    {
      id: 1,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product1/300/400'
    },
    {
      id: 2,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product2/300/400'
    },
    {
      id: 3,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product3/300/400'
    },
    {
      id: 4,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product4/300/400'
    },
    {
      id: 5,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product5/300/400'
    },
    {
      id: 6,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product6/300/400'
    },
    {
      id: 7,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product7/300/400'
    },
    {
      id: 8,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product8/300/400'
    },
    {
      id: 9,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product9/300/400'
    },
    {
      id: 10,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product10/300/400'
    },
    {
      id: 11,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product11/300/400'
    },
    {
      id: 12,
      title: 'Graphic Design',
      price: 16.48,
      description: 'English Department',
      src: 'https://picsum.photos/seed/product12/300/400'
    }
  ]

  export const categoriesForShopPage = [
    {
      id: 1,
      name: "Women",
      image: sarikiz,
      subtext: "Spring Collection"
    },
    {
      id: 2,
      name: "Men",
      image: sapkali,
      subtext: "New Arrivals"
    },
    {
      id: 3,
      name: "Kids",
      image: zrgn,
      subtext: "Comfortable Styles"
    },
    {
      id: 4,
      name: "Accessories",
      image: sin2,
      subtext: "New Trends"
    },
    {
      id: 5,
      name: "Sale",
      image: kzn,
      subtext: "Up to 70% Off"
    }
  ]
  
  export const partnersForShopPage = [
    { id: 1, image: 'https://picsum.photos/seed/partner1/150/50', alt: 'Hooli' },
    { id: 2, image: 'https://picsum.photos/seed/partner2/150/50', alt: 'Lyft' },
    { id: 3, image: 'https://picsum.photos/seed/partner3/150/50', alt: 'Stripe' },
    { id: 4, image: 'https://picsum.photos/seed/partner4/150/50', alt: 'AWS' },
    { id: 5, image: 'https://picsum.photos/seed/partner5/150/50', alt: 'Reddit' }
  ]
 export const contactLocations = [
    {
      city: 'Paris',
      address: '1901 Thorn ridge Cir.',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'Berlin',
      address: '4140 Parker Rd.',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'New York',
      address: '2715 Ash Dr. San Jose,',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'London',
      address: '3517 W. Gray St. Utica,',
      zip: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    }
  ]
  