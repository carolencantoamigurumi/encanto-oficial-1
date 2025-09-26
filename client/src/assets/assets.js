import p_img1 from "./p_img1.jpg";
import p_img2_1 from "./p_img2_1.png";
import p_img2_2 from "./p_img2_2.png";
import p_img2_3 from "./p_img2_3.png";
import p_img2_4 from "./p_img2_4.png";
import p_img3 from "./p_img3.jpg";
import p_img4 from "./p_img4.jpeg";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.jpg";
import p_img7 from "./p_img7.png";
import p_img8 from "./p_img8.jpg";

import boleto_icon from "./boleto_icon.svg";
import carol from "./carol.jpg";
import contact_img from "./contact_img.png";
import encanto from './encanto.png'
import exchange_icon from "./exchange_icon.svg";
import facebook_icon from './facebook_icon.png'
import instagram_icon from "./instagram_icon.svg";
import logo from "./logo.png";
import logo_admin from "./logo_admin.png"
import mercado_pago from "./mercado_pago.svg";
import paypal_icon from "./paypal_icon.png";
import pix_icon from "./pix_icon.svg";
import powerpuff_icon from "./powerpuff_icon.svg";
import profile_icon from "./profile_icon.svg";
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import quality_icon from "./quality_icon.svg";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_img from "./support_img.svg";
import upload_area from './uploadArea.png'
import whatsapp_icon from "./whatsapp_icon.svg";
import youtube_icon from "./youtube_icon.png";

export const assets = {
  boleto_icon,
  carol,
  contact_img,
  encanto,
  exchange_icon,
  facebook_icon,
  instagram_icon,
  logo,
  logo_admin,
  mercado_pago,
  paypal_icon,
  pix_icon,
  powerpuff_icon,
  profile_icon,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  quality_icon,
  star_dull_icon,
  star_icon,
  support_img,
  upload_area,
  whatsapp_icon,
  youtube_icon,
};

export const dummyAdminData = {
    "_id": "675ac1512100b91a6d9b8b24",
    "name": "Carol Caetano",
    "email": "carolencanto.amigurumi@gmail.com",
    "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMFdoYklyQjN6VWhRSEZFZXU0ajZubFBCRkYifQ?width=80",
    "createdAt": "2024-12-12T10:56:17.930Z",
    "updatedAt": "2024-12-12T10:56:17.930Z",
    "__v": 0
}

export const couponDummyData = [
    { code: "NEW20", description: "20% Off for New Users", discount: 20, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:31.183Z" },
    { code: "NEW10", description: "10% Off for New Users", discount: 10, forNewUser: true, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:35:50.653Z" },
    { code: "OFF20", description: "20% Off for All Users", discount: 20, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:00.811Z" },
    { code: "OFF10", description: "10% Off for All Users", discount: 10, forNewUser: false, forMember: false, isPublic: false, expiresAt: "2026-12-31T00:00:00.000Z", createdAt: "2025-08-22T08:42:21.279Z" },
    { code: "PLUS10", description: "20% Off for Members", discount: 10, forNewUser: false, forMember: true, isPublic: false, expiresAt: "2027-03-06T00:00:00.000Z", createdAt: "2025-08-22T11:38:20.194Z" }
]


export const dummyTestimonial = [
  {
    userId: "user_42fLkN98JUxqzmo24Y5dnkgwty", // Amanda Silva
    name: "Amanda Silva",
    city: "Rio de Janeiro - RJ",
    image: assets.profile_img_2,
    rating: 5,
    review: "Amei a receita! Muito bem explicada.",
  },
  {
    userId: "user_53mPmV87HTwepyo35Z9ejhklrq", // Carlos Oliveira
    name: "Carlos Oliveira",
    city: "Belo Horizonte - MG",
    image: assets.profile_img_3,
    rating: 4,
    review: "Gostei muito do resultado final, fácil de seguir!",
  },
  {
    userId: "user_64zRnX76IVfdrnp46A1flmgpsu", // Beatriz Santos
    name: "Beatriz Santos",
    city: "Curitiba - PR",
    image: assets.profile_img_1,
    rating: 5,
    review: "Um dos trabalhos mais lindos que já fiz em crochê.",
  },
  {
    userId: "user_75yTqY65JWhesoq57B6glnhtvr", // Felipe Costa
    name: "Felipe Costa",
    city: "Porto Alegre - RS",
    image: assets.profile_img_3,
    rating: 4,
    review: "Presente perfeito para minha melhor amiga.",
  },
];


export const dummyDashboardData = {
    "totalEarnings": "R$ 12.000,00",
    "totalEbooks": 8,
    "clientsData": [
        {
            "ebookTitle": "Caverna do Dragão",
            "client": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "João Caetano",
                "imageUrl": "https://lh3.googleusercontent.com/ogw/AF2bZyhqT1Iv9VtnmHBV2HAPUx1g_8rw0e9ERn0VTNJYYC8Lyg=s32-c-mo"
            }
        },
        {
            "ebookTitle": "Vila do Chaves",
            "client": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "João Caetano",
                "imageUrl": "https://lh3.googleusercontent.com/ogw/AF2bZyhqT1Iv9VtnmHBV2HAPUx1g_8rw0e9ERn0VTNJYYC8Lyg=s32-c-mo"
            }
        },
        {
            "ebookTitle": "Marvel",
            "client": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "João Caetano",
                "imageUrl": "https://lh3.googleusercontent.com/ogw/AF2bZyhqT1Iv9VtnmHBV2HAPUx1g_8rw0e9ERn0VTNJYYC8Lyg=s32-c-mo"
            }
        },
        {
            "ebookTitle": "Naruto",
            "client": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9W",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        },
        {
            "ebookTitle": "Amigos",
            "client": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9W",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        }
    ],
    
}

// --------------------------- Dummy Data ---------------------------
export const dummyProducts = [
  {
    _id: "aaaaa",
    name: "Caverna do Dragão",
    description: "Receita incrível para criar os personagens de Caverna do Dragão em amigurumi.",
    price: 100,
    image: [p_img1],
    ebookFile: "ebooks/cavernadodragao.pdf",
    category: "Personagens",
    subCategory: "TV",
    discount: 15,
    ebookRatings: [
      { userId: "user_42fLkN98JUxqzmo24Y5dnkgwty", rating: 5, _id: "6773e37360cb0ab974342314" }, // Amanda Silva
      { userId: "user_53mPmV87HTwepyo35Z9ejhklrq", rating: 4, _id: "6773e37360cb0ab974342315" }, // Carlos Oliveira
    ],
    ebookReviews: [
      {
        userId: "user_42fLkN98JUxqzmo24Y5dnkgwty",
        name: "Amanda Silva",
        review: "Amei a receita! Muito bem explicada.",
        date: new Date("2024-12-01"),
        _id: "6773e37360cb0ab974342316"
      },
      {
        userId: "user_53mPmV87HTwepyo35Z9ejhklrq",
        name: "Carlos Oliveira",
        review: "Gostei muito do resultado final, fácil de seguir!",
        date: new Date("2024-12-02"),
        _id: "6773e37360cb0ab974342317"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaab",
    name: "Vila do Chaves",
    description: "Faça os personagens da Vila do Chaves em amigurumi e relembre momentos clássicos.",
    price: 120,
    image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    category: "Personagens",
    subCategory: "TV",
    discount: 10,
    ebookRatings: [
      { userId: "user_31dQbH27HVtovbs13X2cmqefddM", rating: 2, _id: "6773e37360cb0ab974342318" }, // GreatStack
    ],
    ebookReviews: [
      {
        userId: "user_31dQbH27HVtovbs13X2cmqefddM",
        name: "GreatStack",
        review: "Receita divertida, adorei fazer o Chaves!",
        date: new Date("2024-12-03"),
        _id: "6773e37360cb0ab974342319"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaac",
    name: "Marvel",
    description: "Super-heróis da Marvel em versão amigurumi, perfeitos para colecionar.",
    price: 150,
    image: [p_img3],
    category: "Personagens",
    subCategory: "Heróis",
    discount: 5,
    ebookRatings: [
      { userId: "user_53mPmV87HTwepyo35Z9ejhklrq", rating: 4, _id: "6773e37360cb0ab974342320" }, // Carlos Oliveira
    ],
    ebookReviews: [
      {
        userId: "user_53mPmV87HTwepyo35Z9ejhklrq",
        name: "Carlos Oliveira",
        review: "Meus filhos amaram o Homem de Ferro em amigurumi!",
        date: new Date("2024-12-05"),
        _id: "6773e37360cb0ab974342321"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaad",
    name: "Naruto",
    description: "Receita detalhada para criar Naruto em amigurumi, ideal para fãs de anime.",
    price: 170,
    image: [p_img4],
    category: "Personagens",
    subCategory: "Anime",
    discount: 10,
    ebookRatings: [
      { userId: "user_64zRnX76IVfdrnp46A1flmgpsu", rating: 5, _id: "6773e37360cb0ab974342322" }, // Beatriz Santos
    ],
    ebookReviews: [
      {
        userId: "user_64zRnX76IVfdrnp46A1flmgpsu",
        name: "Beatriz Santos",
        review: "Muito bem explicado, consegui fazer até o sharingan!",
        date: new Date("2024-12-06"),
        _id: "6773e37360cb0ab974342323"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaae",
    name: "Amigos",
    description: "Receita personalizada para fazer amigurumis que representam amizade.",
    price: 200,
    image: [p_img5],
    category: "Personalizados",
    subCategory: "Amigos",
    discount: 0,
    ebookRatings: [
      { userId: "user_75yTqY65JWhesoq57B6glnhtvr", rating: 4, _id: "6773e37360cb0ab974342324" }, // Felipe Costa
    ],
    ebookReviews: [
      {
        userId: "user_75yTqY65JWhesoq57B6glnhtvr",
        name: "Felipe Costa",
        review: "Presente perfeito para minha melhor amiga.",
        date: new Date("2024-12-07"),
        _id: "6773e37360cb0ab974342325"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaaf",
    name: "Bichinhos",
    description: "Receitas fofas para criar diversos bichinhos em amigurumi.",
    price: 130,
    image: [p_img6],
    category: "Animais",
    subCategory: "Diversos",
    discount: 0,
    ebookRatings: [
      { userId: "user_42fLkN98JUxqzmo24Y5dnkgwty", rating: 5, _id: "6773e37360cb0ab974342326" }, // Amanda Silva
    ],
    ebookReviews: [
      {
        userId: "user_42fLkN98JUxqzmo24Y5dnkgwty",
        name: "Amanda Silva",
        review: "Muito fofo, fiz um ursinho e ficou lindo.",
        date: new Date("2024-12-08"),
        _id: "6773e37360cb0ab974342327"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaag",
    name: "Meninas Superpoderosas",
    description: "As Meninas Superpoderosas em versão amigurumi, receita exclusiva.",
    price: 300,
    image: [p_img7],
    category: "Personagens",
    subCategory: "TV",
    discount: 0,
    ebookRatings: [
      { userId: "user_53mPmV87HTwepyo35Z9ejhklrq", rating: 5, _id: "6773e37360cb0ab974342328" }, // Carlos Oliveira
    ],
    ebookReviews: [
      {
        userId: "user_53mPmV87HTwepyo35Z9ejhklrq",
        name: "Carlos Oliveira",
        review: "Fiz a Lindinha e ficou maravilhosa!",
        date: new Date("2024-12-09"),
        _id: "6773e37360cb0ab974342329"
      },
    ],
    date: Date.now(),
  },
  {
    _id: "aaaah",
    name: "Presépio",
    description: "Receita completa para montar um presépio natalino em amigurumi.",
    price: 1300,
    image: [p_img8],
    category: "Religiosos",
    subCategory: "Natal",
    discount: 20,
    ebookRatings: [
      { userId: "user_64zRnX76IVfdrnp46A1flmgpsu", rating: 5, _id: "6773e37360cb0ab974342330" }, // Beatriz Santos
    ],
    ebookReviews: [
      {
        userId: "user_64zRnX76IVfdrnp46A1flmgpsu",
        name: "Beatriz Santos",
        review: "Um dos trabalhos mais lindos que já fiz em crochê.",
        date: new Date("2024-12-10"),
        _id: "6773e37360cb0ab974342331"
      },
    ],
    date: Date.now(),
  },
];






export const orderProducts = [
  {
    _id: "order_001",
    items: [
      {
        name: "Caverna do Dragão",
        quantity: 1,
        price: 150.0,
        image: p_img1,
      },
      {
        name: "Marvel",
        quantity: 2,
        price: 125.0,
        image: p_img3,
      },
    ],
    address: {
      firstName: "João",
      lastName: "Caetano",
      phone: "(11) 99999-1234",
      email: "joao.caetano@email.com",
      address:
        "R. Ten. Alexandre Gandhi de Souza Lacerda, 1074 - Chácara São, São Paulo/SP, 04893-080, Brasil",
    },
    paymentMethod: "MercadoPago - Pix",
    payment: true,
    date: "2025-09-18T15:30:00Z",
    amount: 400.0,
    couponCode: "AMIGURUMI15",
  },
  {
    _id: "order_002",
    items: [
      {
        name: "Naruto",
        quantity: 1,
        price: 170.0,
        image: p_img4,
      },
    ],
    address: {
      firstName: "Maria",
      lastName: "Silva",
      phone: "(21) 98888-4321",
      email: "maria.silva@email.com",
      address:
        "Rua das Acácias, 222 - Centro, Rio de Janeiro/RJ, 20030-000, Brasil",
    },
    paymentMethod: "PayPal - Cartão",
    payment: false,
    date: "2025-09-17T12:15:00Z",
    amount: 170.0,
    couponCode: null,
  },
  {
    _id: "order_003",
    items: [
      {
        name: "Meninas Superpoderosas",
        quantity: 1,
        price: 250.0,
        image: p_img7,
      },
      {
        name: "Amigos",
        quantity: 1,
        price: 180.0,
        image: p_img5,
      },
      {
        name: "Bichinhos",
        quantity: 3,
        price: 200.0,
        image: p_img6,
      },
    ],
    address: {
      firstName: "Carlos",
      lastName: "Pereira",
      phone: "(31) 97777-6543",
      email: "carlos.pereira@email.com",
      address:
        "Av. Liberdade, 1300 - Savassi, Belo Horizonte/MG, 30140-070, Brasil",
    },
    paymentMethod: "Boleto Bancário",
    payment: true,
    date: "2025-09-15T09:00:00Z",
    amount: 1030.0,
    couponCode: "DESCONTO20",
  },
];

export const dummyUserData = [
  {
    id: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "GreatStack",
    email: "greatstack@example.com",
    cpf: "011.326.298-71",
    phone: "(11) 91234-5678",
    role: "admin",
    image: profile_img_1,
    cart: {}
  },
  {
    id: "user_42fLkN98JUxqzmo24Y5dnkgwty",
    name: "Amanda Silva",
    email: "amanda.silva@example.com",
    cpf: "123.456.789-00",
    phone: "(21) 98765-4321",
    role: "user",
    image: profile_img_2,
    cart: { itemCount: 2 }
  },
  {
    id: "user_53mPmV87HTwepyo35Z9ejhklrq",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    cpf: "987.654.321-00",
    phone: "(31) 99888-7777",
    role: "user",
    image: profile_img_3,
    cart: { itemCount: 0 }
  },
  {
    id: "user_64zRnX76IVfdrnp46A1flmgpsu",
    name: "Beatriz Santos",
    email: "beatriz.santos@example.com",
    cpf: "444.555.666-77",
    phone: "(41) 91234-5678",
    role: "user",
    image: profile_img_1,
    cart: { itemCount: 5 }
  },
  {
    id: "user_75yTqY65JWhesoq57B6glnhtvr",
    name: "Felipe Costa",
    email: "felipe.costa@example.com",
    cpf: "222.333.444-55",
    phone: "(51) 98765-4321",
    role: "user",
    image: profile_img_3,
    cart: { itemCount: 1 }
  }
]

