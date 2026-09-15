"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";

type Product = {
  id: string;
  title: string;
  category: string;
  recipient: string;
  occasion: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  availability: "In Stock" | "Only a Few Left" | "Preorder";
  rating: number;
  reviews: number;
  shortDescription: string;
  detailedDescription: string;
  included: string[];
  kind: "pack" | "item";
};

type CartItem = {
  product: Product;
  quantity: number;
};

type GiftForm = {
  recipientType: string;
  occasion: string;
  budget: string;
  customBudget: string;
  preferredItems: string;
  favouriteColours: string;
  specialRequests: string;
  recipientName: string;
  personalMessage: string;
  deliveryDate: string;
  photoName: string;
};

type CheckoutForm = {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  instructions: string;
  recipientName: string;
  giftMessage: string;
  deliveryDate: string;
  paymentMethod: string;
};

const whatsappNumber = "94771234567";

const navItems = [
  ["Home", "home"],
  ["Shop", "shop"],
  ["Gift Packs", "gift-packs"],
  ["Build Your Gift", "build-your-gift"],
  ["Occasions", "occasions"],
  ["New Arrivals", "new-arrivals"],
  ["About Us", "about-us"],
  ["Contact", "contact"],
];

const categories = [
  "Gifts for Her",
  "Gifts for Him",
  "Couple Gifts",
  "Birthday Gifts",
  "Anniversary Gifts",
  "Best Friend Gifts",
  "Family Gifts",
  "Under Rs. 1,500",
  "Under Rs. 2,500",
  "Premium Gift Boxes",
];

const recipientOptions = [
  "Girlfriend",
  "Boyfriend",
  "Wife",
  "Husband",
  "Friend",
  "Mother",
  "Father",
  "Sister",
  "Brother",
  "Teacher",
  "Colleague",
  "Other",
];

const occasionOptions = [
  "Birthday",
  "Anniversary",
  "Love",
  "Congratulations",
  "Thank You",
  "Sorry",
  "Graduation",
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  "Just Because",
  "Other",
];

const budgetOptions = [
  "Rs. 1,000",
  "Rs. 1,500",
  "Rs. 2,000",
  "Rs. 2,500",
  "Rs. 3,000",
  "Rs. 5,000",
  "Rs. 7,500",
  "Rs. 10,000",
  "Custom Budget",
];

const allProducts: Product[] = [
  {
    id: "girl-gift-pack-1500",
    title: "Girl Gift Pack",
    category: "Gift Packs",
    recipient: "Her",
    occasion: "Birthday",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    availability: "In Stock",
    rating: 4.9,
    reviews: 86,
    shortDescription: "Small teddy, bracelet, chocolate, greeting card and gift box.",
    detailedDescription:
      "A sweet, ready-to-gift box for birthdays, friendship moments and simple surprises. Packed in a soft premium style with a cute handwritten-card feel.",
    included: ["Small teddy", "Bracelet", "Chocolate", "Greeting card", "Gift box"],
    kind: "pack",
  },
  {
    id: "boy-gift-pack-2000",
    title: "Boy Gift Pack",
    category: "Gift Packs",
    recipient: "Him",
    occasion: "Just Because",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=900&q=80",
    badge: "New Arrival",
    availability: "In Stock",
    rating: 4.8,
    reviews: 64,
    shortDescription: "Watch, wallet, keytag, bracelet and premium gift box.",
    detailedDescription:
      "A practical and thoughtful gift pack for brothers, partners, friends and husbands with useful everyday accessories.",
    included: ["Watch", "Wallet", "Keytag", "Bracelet", "Gift box"],
    kind: "pack",
  },
  {
    id: "couple-gift-pack-2500",
    title: "Couple Gift Pack",
    category: "Gift Packs",
    recipient: "Couples",
    occasion: "Anniversary",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
    badge: "Only a Few Left",
    availability: "Only a Few Left",
    rating: 4.9,
    reviews: 112,
    shortDescription: "Pair keytags, bracelets, teddy, couple card and chocolates.",
    detailedDescription:
      "A charming matching gift box for anniversaries, Valentine's surprises and couple milestones.",
    included: ["2 keytags", "2 bracelets", "Small teddy", "Couple card", "Chocolates"],
    kind: "pack",
  },
  {
    id: "premium-memory-box",
    title: "Premium Memory Box",
    category: "Premium Gift Boxes",
    recipient: "Family",
    occasion: "Thank You",
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80",
    badge: "Premium",
    availability: "Preorder",
    rating: 5,
    reviews: 41,
    shortDescription: "Elegant keepsakes, flowers, card, chocolates and photo frame.",
    detailedDescription:
      "A polished gift box designed for milestone moments, family surprises and meaningful thank-you gifts.",
    included: ["Photo frame", "Mini bouquet", "Greeting card", "Chocolates", "Premium box"],
    kind: "pack",
  },
  {
    id: "mini-teddy",
    title: "Mini Teddy Bear",
    category: "Teddy Bears",
    recipient: "Her",
    occasion: "Love",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80",
    badge: "Cute Pick",
    availability: "In Stock",
    rating: 4.7,
    reviews: 37,
    shortDescription: "Soft mini teddy for gift boxes and small surprises.",
    detailedDescription:
      "A soft, compact teddy that fits beautifully into custom gift boxes or works as a simple add-on gift.",
    included: ["Mini teddy", "Ribbon wrap"],
    kind: "item",
  },
  {
    id: "classic-watch",
    title: "Classic Everyday Watch",
    category: "Watches",
    recipient: "Him",
    occasion: "Birthday",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    availability: "Only a Few Left",
    rating: 4.8,
    reviews: 52,
    shortDescription: "Minimal watch with premium everyday styling.",
    detailedDescription:
      "A clean, timeless watch that works well for boyfriends, husbands, brothers and friends.",
    included: ["Watch", "Gift wrap option"],
    kind: "item",
  },
  {
    id: "gold-necklace",
    title: "Dainty Gold Necklace",
    category: "Jewellery",
    recipient: "Her",
    occasion: "Anniversary",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    badge: "New Arrival",
    availability: "In Stock",
    rating: 4.8,
    reviews: 48,
    shortDescription: "Elegant necklace for soft, thoughtful gifting.",
    detailedDescription:
      "A subtle jewellery piece that feels premium while staying affordable for everyday celebrations.",
    included: ["Necklace", "Mini pouch", "Care card"],
    kind: "item",
  },
  {
    id: "couple-bracelets",
    title: "Matching Couple Bracelets",
    category: "Bracelets",
    recipient: "Couples",
    occasion: "Love",
    price: 1250,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    badge: "Sale",
    availability: "In Stock",
    rating: 4.7,
    reviews: 44,
    shortDescription: "Simple matching bracelets for two.",
    detailedDescription:
      "A cute couple add-on for anniversary boxes, love gifts and Valentine's Day surprises.",
    included: ["2 bracelets", "Gift pouch"],
    kind: "item",
  },
  {
    id: "cute-stationery-set",
    title: "Cute Stationery Set",
    category: "Stationery",
    recipient: "Friend",
    occasion: "Graduation",
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    availability: "In Stock",
    rating: 4.6,
    reviews: 29,
    shortDescription: "Notebook, cute pen, stickers and gift-ready packing.",
    detailedDescription:
      "A useful and aesthetic stationery bundle for students, teachers, friends and colleagues.",
    included: ["Notebook", "Cute pen", "Sticker sheet", "Paper bag"],
    kind: "item",
  },
  {
    id: "mini-candle",
    title: "Mini Scented Candle",
    category: "Mini Candles",
    recipient: "Family",
    occasion: "Thank You",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=80",
    availability: "In Stock",
    rating: 4.7,
    reviews: 33,
    shortDescription: "A soft scented candle for cozy gift boxes.",
    detailedDescription:
      "Adds a warm and thoughtful feel to customized gift boxes for family, friends and teachers.",
    included: ["Mini candle", "Safety card"],
    kind: "item",
  },
  {
    id: "photo-frame",
    title: "Minimal Photo Frame",
    category: "Photo Frames",
    recipient: "Family",
    occasion: "Anniversary",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    badge: "Memory Gift",
    availability: "In Stock",
    rating: 4.6,
    reviews: 24,
    shortDescription: "Small photo frame for personal gift moments.",
    detailedDescription:
      "A lovely keepsake for printed photos, relationship memories and family celebrations.",
    included: ["Photo frame", "Gift wrap"],
    kind: "item",
  },
  {
    id: "mini-bouquet",
    title: "Mini Artificial Bouquet",
    category: "Artificial Flowers",
    recipient: "Her",
    occasion: "Congratulations",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80",
    badge: "New Arrival",
    availability: "In Stock",
    rating: 4.8,
    reviews: 58,
    shortDescription: "Long-lasting mini bouquet for gift boxes and hand gifts.",
    detailedDescription:
      "A pretty bouquet add-on that photographs beautifully and stays fresh-looking for longer.",
    included: ["Mini bouquet", "Ribbon", "Message tag"],
    kind: "item",
  },
  {
    id: "compact-wallet",
    title: "Compact Wallet",
    category: "Wallets",
    recipient: "Him",
    occasion: "Birthday",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
    availability: "Only a Few Left",
    rating: 4.7,
    reviews: 36,
    shortDescription: "A neat wallet for practical everyday gifting.",
    detailedDescription:
      "A simple, useful gift that pairs well with watches, bracelets and keytags.",
    included: ["Wallet", "Gift sleeve"],
    kind: "item",
  },
  {
    id: "chocolate-gift",
    title: "Chocolate Treat Pack",
    category: "Chocolate Gifts",
    recipient: "Friend",
    occasion: "Just Because",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80",
    badge: "Sweet Add-on",
    availability: "In Stock",
    rating: 4.9,
    reviews: 73,
    shortDescription: "Assorted chocolates packed as a cute treat bundle.",
    detailedDescription:
      "A sweet addition for birthdays, apologies, thank-you gifts and customized boxes.",
    included: ["Assorted chocolates", "Mini card"],
    kind: "item",
  },
  {
    id: "custom-budget-box",
    title: "Custom Budget Gift Box",
    category: "Customized Gifts",
    recipient: "Everyone",
    occasion: "Other",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
    badge: "Customize",
    availability: "Preorder",
    rating: 5,
    reviews: 95,
    shortDescription: "Tell us your budget, occasion and preferences.",
    detailedDescription:
      "Our signature service. Share the recipient, budget, colours and message, and we curate a beautiful box for you.",
    included: ["Gift consultation", "Curated items", "Personal card", "Gift box"],
    kind: "pack",
  },
];

const giftPackCollections = [
  {
    title: "For Her",
    description: "Teddies, jewellery, flowers, candles and soft keepsakes.",
    productIds: ["girl-gift-pack-1500", "gold-necklace", "mini-bouquet"],
  },
  {
    title: "For Him",
    description: "Watches, wallets, keytags, bracelets and useful accessories.",
    productIds: ["boy-gift-pack-2000", "classic-watch", "compact-wallet"],
  },
  {
    title: "For Couples",
    description: "Matching pair gifts, couple cards and sweet memory boxes.",
    productIds: ["couple-gift-pack-2500", "couple-bracelets", "chocolate-gift"],
  },
  {
    title: "Birthday Packs",
    description: "Ready-to-surprise birthday bundles for every budget.",
    productIds: ["girl-gift-pack-1500", "boy-gift-pack-2000", "mini-teddy"],
  },
  {
    title: "Anniversary Packs",
    description: "Elegant boxes for partners, spouses and relationship moments.",
    productIds: ["couple-gift-pack-2500", "gold-necklace", "photo-frame"],
  },
  {
    title: "Best Friend Packs",
    description: "Cute, casual and thoughtful picks for friendship days.",
    productIds: ["cute-stationery-set", "chocolate-gift", "mini-candle"],
  },
  {
    title: "Family Gift Packs",
    description: "Warm, respectful gifts for parents, siblings and relatives.",
    productIds: ["premium-memory-box", "photo-frame", "mini-candle"],
  },
  {
    title: "Budget Gift Boxes",
    description: "Affordable boxes under Rs. 1,500 and Rs. 2,500.",
    productIds: ["girl-gift-pack-1500", "couple-bracelets", "chocolate-gift"],
  },
  {
    title: "Premium Gift Boxes",
    description: "Elevated presentation for milestone celebrations.",
    productIds: ["premium-memory-box", "custom-budget-box", "couple-gift-pack-2500"],
  },
];

const instagramImages = [
  {
    title: "Gift boxes",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Birthday gifts",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Couple gifts",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Customized orders",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Happy customers",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "New products",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },
];

const testimonials = [
  "Beautiful packaging and very friendly service.",
  "Perfect gift for my girlfriend. Highly recommended.",
  "I only gave them my budget and they created an amazing gift box.",
  "Fast delivery and beautiful products.",
];

const trustItems = [
  ["Islandwide Delivery", "Fast and reliable delivery across Sri Lanka."],
  ["Beautifully Packed", "Every gift is carefully prepared and packed."],
  ["Affordable Gift Options", "Gift ideas for different budgets."],
  ["Custom Gift Boxes", "Tell us your budget and we create something special."],
  ["Friendly Support", "Easy assistance through WhatsApp and social media."],
];

const emptyGiftForm: GiftForm = {
  recipientType: "Girlfriend",
  occasion: "Birthday",
  budget: "Rs. 2,000",
  customBudget: "",
  preferredItems: "",
  favouriteColours: "",
  specialRequests: "",
  recipientName: "",
  personalMessage: "",
  deliveryDate: "",
  photoName: "",
};

const emptyCheckoutForm: CheckoutForm = {
  fullName: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  instructions: "",
  recipientName: "",
  giftMessage: "",
  deliveryDate: "",
  paymentMethod: "Cash on Delivery",
};

const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString("en-LK")}`;

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quickQuantity, setQuickQuantity] = useState(1);
  const [giftForm, setGiftForm] = useState<GiftForm>(emptyGiftForm);
  const [giftSubmitted, setGiftSubmitted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>(emptyCheckoutForm);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    recipient: "All",
    occasion: "All",
    price: "All",
    availability: "All",
  });
  const [sort, setSort] = useState("Newest");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = cart.length === 0 ? 0 : subtotal >= 5000 ? 0 : 450;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal + deliveryCharge - discount);

  const categoryOptions = ["All", ...Array.from(new Set(allProducts.map((product) => product.category)))];
  const recipientFilterOptions = ["All", "Her", "Him", "Couples", "Friend", "Family", "Everyone"];
  const occasionFilterOptions = ["All", ...occasionOptions.filter((option) => option !== "Other")];

  const popularPacks = allProducts.filter((product) =>
    ["girl-gift-pack-1500", "boy-gift-pack-2000", "couple-gift-pack-2500"].includes(product.id),
  );

  const cuteThings = allProducts.filter((product) => product.kind === "item").slice(0, 8);
  const newArrivals = allProducts.filter((product) => product.badge === "New Arrival");
  const relatedProducts = selectedProduct
    ? allProducts
        .filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id)
        .slice(0, 3)
    : [];

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const priceMatches = (price: number) => {
      if (filters.price === "Under Rs. 1,500") return price <= 1500;
      if (filters.price === "Rs. 1,500 - Rs. 2,500") return price >= 1500 && price <= 2500;
      if (filters.price === "Rs. 2,500 - Rs. 5,000") return price >= 2500 && price <= 5000;
      if (filters.price === "Above Rs. 5,000") return price > 5000;
      return true;
    };

    const matches = allProducts.filter((product) => {
      const text = [
        product.title,
        product.category,
        product.recipient,
        product.occasion,
        product.shortDescription,
        ...product.included,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (filters.category === "All" || product.category === filters.category) &&
        (filters.recipient === "All" || product.recipient === filters.recipient) &&
        (filters.occasion === "All" || product.occasion === filters.occasion) &&
        (filters.availability === "All" || product.availability === filters.availability) &&
        priceMatches(product.price)
      );
    });

    return [...matches].sort((a, b) => {
      if (sort === "Most Popular") return b.reviews - a.reviews;
      if (sort === "Best Selling") return b.rating * b.reviews - a.rating * a.reviews;
      if (sort === "Price Low to High") return a.price - b.price;
      if (sort === "Price High to Low") return b.price - a.price;
      return b.id.localeCompare(a.id);
    });
  }, [filters, query, sort]);

  const wishlistProducts = allProducts.filter((product) => wishlist.has(product.id));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Thashy Gift Hub",
    description:
      "Affordable Sri Lankan gift shop for ready-made gift packs, individual gifts and customized budget gift boxes.",
    areaServed: "Sri Lanka",
    priceRange: "Rs. 850 - Rs. 10,000",
    slogan: "Tell Us Your Budget, We Create the Gift.",
    sameAs: ["https://www.instagram.com/", "https://www.tiktok.com/", "https://www.facebook.com/"],
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const updateFilter = (name: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
            : item,
        );
      }
      return [...current, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  };

  const saveForLater = (product: Product) => {
    setSavedForLater((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    removeFromCart(product.id);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setQuickQuantity(1);
  };

  const applyPromoCode = () => {
    setPromoApplied(promoCode.trim().toUpperCase() === "THASHY10");
  };

  const giftWhatsAppMessage = () => {
    const budget = giftForm.budget === "Custom Budget" ? giftForm.customBudget : giftForm.budget;
    return [
      "Hello Thashy Gift Hub, I want to create a custom gift.",
      `Who is it for: ${giftForm.recipientType}`,
      `Occasion: ${giftForm.occasion}`,
      `Budget: ${budget || "Not specified"}`,
      `Preferred items: ${giftForm.preferredItems || "Open to suggestions"}`,
      `Favourite colours: ${giftForm.favouriteColours || "Not specified"}`,
      `Recipient name: ${giftForm.recipientName || "Not specified"}`,
      `Personal message: ${giftForm.personalMessage || "Not specified"}`,
      `Preferred delivery date: ${giftForm.deliveryDate || "Not specified"}`,
      `Special requests: ${giftForm.specialRequests || "None"}`,
      giftForm.photoName ? `Photo to include: ${giftForm.photoName}` : "Photo to include: No",
    ].join("\n");
  };

  const cartWhatsAppMessage = () => {
    const selectedProducts = cart
      .map((item) => `${item.product.title} x ${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`)
      .join("\n");

    return [
      "Hello Thashy Gift Hub, I want to place an order.",
      `Customer name: ${checkoutForm.fullName || "Not provided yet"}`,
      `Selected products:\n${selectedProducts || "No products selected"}`,
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery charge: ${formatPrice(deliveryCharge)}`,
      `Discount: ${formatPrice(discount)}`,
      `Total amount: ${formatPrice(total)}`,
      `Delivery address: ${checkoutForm.address || "Not provided yet"}`,
      `City: ${checkoutForm.city || "Not provided yet"}`,
      `Gift recipient: ${checkoutForm.recipientName || "Not provided yet"}`,
      `Gift message: ${checkoutForm.giftMessage || "Not provided yet"}`,
      `Preferred delivery date: ${checkoutForm.deliveryDate || "Not provided yet"}`,
    ].join("\n");
  };

  const handleGiftSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGiftSubmitted(true);
  };

  const handleGiftInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setGiftForm((current) => ({ ...current, [name]: value }));
  };

  const handleCheckoutInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCheckoutForm((current) => ({ ...current, [name]: value }));
  };

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderSuccess(true);
  };

  const resetShop = () => {
    setQuery("");
    setFilters({
      category: "All",
      recipient: "All",
      occasion: "All",
      price: "All",
      availability: "All",
    });
  };

  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Thashy Gift Hub home">
          <span className="brand-mark">TG</span>
          <span>
            <strong>Thashy Gift Hub</strong>
            <small>Tell Us Your Budget</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <form className="header-search" onSubmit={handleSearchSubmit} role="search">
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search gifts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <div className="header-actions" aria-label="Shopping tools">
          <a href="#wishlist">Wishlist <span>{wishlist.size}</span></a>
          <a href="#cart">Cart <span>{cartCount}</span></a>
          <button type="button" onClick={() => setAccountOpen(true)}>
            Account
          </button>
        </div>

        <button
          className="hamburger"
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <form onSubmit={handleSearchSubmit} role="search">
              <label className="sr-only" htmlFor="mobile-search">
                Search products
              </label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search gifts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Thashy Gift Hub</p>
          <h1>Make Every Moment Special with Thashy Gift Hub</h1>
          <p className="hero-subtitle">
            Thoughtful gifts for every person, every occasion and every budget.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#shop">
              Shop Gifts
            </a>
            <a className="button secondary" href="#build-your-gift">
              Build Your Gift
            </a>
          </div>
          <p className="trust-strip">Affordable Gifts • Beautifully Packed • Islandwide Delivery</p>
        </div>
        <div className="hero-media" aria-label="Curated premium gift boxes">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85"
            alt="Elegant wrapped gifts and lifestyle gift boxes"
          />
          <div className="budget-card">
            <span>Tell Us Your Budget</span>
            <strong>We Create the Gift.</strong>
            <p>Custom boxes from Rs. 1,000 with friendly WhatsApp support.</p>
          </div>
        </div>
      </section>

      <section className="section category-section" id="occasions">
        <div className="section-heading">
          <p className="eyebrow">Shop by Category</p>
          <h2>Find the perfect little something</h2>
          <p>Gift ideas for boys, girls, couples, friends and family, sorted by moment and budget.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              className="category-card"
              type="button"
              key={category}
              onClick={() => {
                if (category.includes("Under")) updateFilter("price", category);
                else if (category.includes("Premium")) updateFilter("category", "Premium Gift Boxes");
                else if (category.includes("Couple")) updateFilter("recipient", "Couples");
                else if (category.includes("Him")) updateFilter("recipient", "Him");
                else if (category.includes("Her")) updateFilter("recipient", "Her");
                else if (category.includes("Birthday")) updateFilter("occasion", "Birthday");
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
              <strong>{category}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section warm-band" id="popular-gift-packs">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Ready-made favourites</p>
            <h2>Popular Gift Packs</h2>
          </div>
          <a className="text-link" href="#gift-packs">
            View all packs
          </a>
        </div>
        <div className="product-grid featured-grid">
          {popularPacks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlistActive={wishlist.has(product.id)}
              onWishlist={() => toggleWishlist(product.id)}
              onAdd={() => addToCart(product)}
              onView={() => openProduct(product)}
            />
          ))}
        </div>
      </section>

      <section className="section" id="new-arrivals">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Fresh picks</p>
            <h2>New Arrivals</h2>
          </div>
          <span className="section-pill">Limited weekly drops</span>
        </div>
        <div className="mini-product-row">
          {newArrivals.map((product) => (
            <button className="arrival-card" type="button" key={product.id} onClick={() => openProduct(product)}>
              <img src={product.image} alt={product.title} />
              <span>{product.title}</span>
              <strong>{formatPrice(product.price)}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section build-section" id="build-your-gift">
        <div className="build-intro">
          <p className="eyebrow">Signature service</p>
          <h2>Tell Us Your Budget, We’ll Create the Gift.</h2>
          <p>
            Share the person, occasion, budget and small details. We will curate a thoughtful
            box and continue the order on WhatsApp.
          </p>
          <div className="build-highlights">
            <span>Budget friendly</span>
            <span>Personal messages</span>
            <span>Photo add-ons</span>
          </div>
        </div>

        <form className="gift-builder" onSubmit={handleGiftSubmit}>
          <fieldset>
            <legend>Who is the gift for?</legend>
            <div className="chip-grid">
              {recipientOptions.map((option) => (
                <label className="chip" key={option}>
                  <input
                    type="radio"
                    name="recipientType"
                    value={option}
                    checked={giftForm.recipientType === option}
                    onChange={handleGiftInput}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Select Occasion</legend>
            <div className="chip-grid">
              {occasionOptions.map((option) => (
                <label className="chip" key={option}>
                  <input
                    type="radio"
                    name="occasion"
                    value={option}
                    checked={giftForm.occasion === option}
                    onChange={handleGiftInput}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Select Budget</legend>
            <div className="chip-grid budget-grid">
              {budgetOptions.map((option) => (
                <label className="chip" key={option}>
                  <input
                    type="radio"
                    name="budget"
                    value={option}
                    checked={giftForm.budget === option}
                    onChange={handleGiftInput}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {giftForm.budget === "Custom Budget" && (
              <label className="field full-field">
                <span>Custom budget</span>
                <input
                  name="customBudget"
                  value={giftForm.customBudget}
                  onChange={handleGiftInput}
                  placeholder="Example: Rs. 4,500"
                  inputMode="numeric"
                />
              </label>
            )}
          </fieldset>

          <div className="form-grid">
            <label className="field">
              <span>Preferred items</span>
              <input
                name="preferredItems"
                value={giftForm.preferredItems}
                onChange={handleGiftInput}
                placeholder="Teddy, watch, chocolates..."
              />
            </label>
            <label className="field">
              <span>Favourite colours</span>
              <input
                name="favouriteColours"
                value={giftForm.favouriteColours}
                onChange={handleGiftInput}
                placeholder="Black, pink, beige..."
              />
            </label>
            <label className="field">
              <span>Recipient name</span>
              <input
                name="recipientName"
                value={giftForm.recipientName}
                onChange={handleGiftInput}
                placeholder="Name to add on card"
              />
            </label>
            <label className="field">
              <span>Preferred delivery date</span>
              <input
                type="date"
                name="deliveryDate"
                value={giftForm.deliveryDate}
                onChange={handleGiftInput}
              />
            </label>
            <label className="field full-field">
              <span>Personal message</span>
              <textarea
                name="personalMessage"
                value={giftForm.personalMessage}
                onChange={handleGiftInput}
                placeholder="Write the message for the card"
              />
            </label>
            <label className="field full-field">
              <span>Special requests</span>
              <textarea
                name="specialRequests"
                value={giftForm.specialRequests}
                onChange={handleGiftInput}
                placeholder="Any allergies, favourite brands, delivery notes or presentation ideas"
              />
            </label>
            <label className="upload-field full-field">
              <span>Optional photo upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setGiftForm((current) => ({
                    ...current,
                    photoName: event.target.files?.[0]?.name ?? "",
                  }))
                }
              />
              <small>{giftForm.photoName || "Add a photo if you want it included in the gift box."}</small>
            </label>
          </div>

          <div className="builder-actions">
            <button className="button primary" type="submit">
              Create My Gift
            </button>
            <button className="button secondary" type="button" onClick={() => openWhatsApp(giftWhatsAppMessage())}>
              Continue Order on WhatsApp
            </button>
          </div>

          {giftSubmitted && (
            <div className="confirmation-box" role="status">
              <strong>Your gift brief is ready.</strong>
              <p>
                We saved your selections on this page. Continue on WhatsApp so the team can confirm
                availability, packing style and delivery.
              </p>
              <a className="button primary" href={buildWhatsAppUrl(giftWhatsAppMessage())} target="_blank" rel="noreferrer">
                Send Details on WhatsApp
              </a>
            </div>
          )}
        </form>
      </section>

      <section className="section shop-section" id="shop">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Full shop</p>
            <h2>Cute Little Things</h2>
            <p>Browse individual products and ready-made packs customers can purchase separately.</p>
          </div>
          <span className="section-pill">{filteredProducts.length} products</span>
        </div>

        <div className="shop-layout">
          <aside className="filters" aria-label="Product filters">
            <form className="filter-search" onSubmit={handleSearchSubmit}>
              <label htmlFor="product-search">Search products</label>
              <input
                id="product-search"
                type="search"
                placeholder="Try bracelets, teddy, wallet"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>

            <FilterSelect
              label="Category"
              value={filters.category}
              options={categoryOptions}
              onChange={(value) => updateFilter("category", value)}
            />
            <FilterSelect
              label="Recipient"
              value={filters.recipient}
              options={recipientFilterOptions}
              onChange={(value) => updateFilter("recipient", value)}
            />
            <FilterSelect
              label="Occasion"
              value={filters.occasion}
              options={occasionFilterOptions}
              onChange={(value) => updateFilter("occasion", value)}
            />
            <FilterSelect
              label="Price range"
              value={filters.price}
              options={[
                "All",
                "Under Rs. 1,500",
                "Rs. 1,500 - Rs. 2,500",
                "Rs. 2,500 - Rs. 5,000",
                "Above Rs. 5,000",
              ]}
              onChange={(value) => updateFilter("price", value)}
            />
            <FilterSelect
              label="Availability"
              value={filters.availability}
              options={["All", "In Stock", "Only a Few Left", "Preorder"]}
              onChange={(value) => updateFilter("availability", value)}
            />
            <FilterSelect
              label="Sort by"
              value={sort}
              options={["Newest", "Most Popular", "Best Selling", "Price Low to High", "Price High to Low"]}
              onChange={setSort}
            />
            <button className="button secondary filter-reset" type="button" onClick={resetShop}>
              Reset Filters
            </button>
          </aside>

          <div className="shop-results">
            {filteredProducts.length > 0 ? (
              <div className="product-grid shop-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlistActive={wishlist.has(product.id)}
                    compact
                    onWishlist={() => toggleWishlist(product.id)}
                    onAdd={() => addToCart(product)}
                    onView={() => openProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state no-results">
                <span>No Products Found</span>
                <h3>No gifts match those filters yet.</h3>
                <p>Try a different budget, recipient or occasion to see more gift ideas.</p>
                <button className="button primary" type="button" onClick={resetShop}>
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section cute-section">
        <div className="section-heading">
          <p className="eyebrow">Individual add-ons</p>
          <h2>Small gifts that make the box feel personal</h2>
        </div>
        <div className="cute-grid">
          {cuteThings.map((product) => (
            <button className="cute-card" type="button" key={product.id} onClick={() => openProduct(product)}>
              <img src={product.image} alt={product.title} />
              <span>{product.category}</span>
              <strong>{product.title}</strong>
              <small>{formatPrice(product.price)}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section packs-section" id="gift-packs">
        <div className="section-heading">
          <p className="eyebrow">Gift pack page</p>
          <h2>Ready-made packs for every person</h2>
          <p>Every pack clearly lists what is inside, so customers can order with confidence.</p>
        </div>
        <div className="pack-collection-grid">
          {giftPackCollections.map((collection) => {
            const items = collection.productIds
              .map((id) => allProducts.find((product) => product.id === id))
              .filter(Boolean) as Product[];

            return (
              <article className="pack-collection" key={collection.title}>
                <div>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                </div>
                <ul>
                  {items.flatMap((product) => product.included.slice(0, 2)).slice(0, 5).map((item, itemIndex) => (
                    <li key={`${collection.title}-${item}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
                <button className="button secondary" type="button" onClick={() => openProduct(items[0])}>
                  View Pack
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section why-section">
        <div className="section-heading">
          <p className="eyebrow">Why shop with us</p>
          <h2>Cute, trusted and easy to order</h2>
        </div>
        <div className="trust-grid">
          {trustItems.map(([title, description]) => (
            <article className="trust-card" key={title}>
              <span aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about-us">
        <div className="about-media">
          <img
            src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1000&q=82"
            alt="A curated gift box with soft packing details"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Us</p>
          <h2>Small gifts, beautiful memories</h2>
          <p>
            At Thashy Gift Hub, we believe every small gift can create a beautiful memory.
            Whether you’re celebrating a birthday, anniversary, friendship, relationship, or
            simply surprising someone special, we make gifting easy and memorable.
          </p>
          <p>
            Choose from our ready-made gift packs, individual gift items, or simply tell us your
            budget and occasion. Our team will create a beautiful customized gift just for you.
          </p>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Customer reviews</p>
            <h2>Loved by thoughtful gifters</h2>
          </div>
          <span className="section-pill">4.9 average rating</span>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((review, index) => (
            <article className="testimonial-card" key={review}>
              <div className="rating" aria-label="5 star rating">★★★★★</div>
              <p>“{review}”</p>
              <strong>Customer {index + 1}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section instagram-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Instagram gallery</p>
            <h2>Follow Our Little Gift Moments</h2>
          </div>
          <a className="text-link" href="#contact">
            @thashygifthub
          </a>
        </div>
        <div className="instagram-grid">
          {instagramImages.map((item) => (
            <article className="instagram-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section wishlist-section" id="wishlist">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Wishlist</p>
            <h2>Your saved gift ideas</h2>
          </div>
          <span className="section-pill">{wishlistProducts.length} saved</span>
        </div>
        {wishlistProducts.length > 0 ? (
          <div className="mini-product-row">
            {wishlistProducts.map((product) => (
              <button className="arrival-card" type="button" key={product.id} onClick={() => openProduct(product)}>
                <img src={product.image} alt={product.title} />
                <span>{product.title}</span>
                <strong>{formatPrice(product.price)}</strong>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>Wishlist Empty</span>
            <h3>Save gift ideas while browsing.</h3>
            <p>Tap Wishlist on any product so you can compare and order later.</p>
          </div>
        )}
      </section>

      <section className="section cart-checkout-section" id="cart">
        <div className="cart-panel">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Shopping Cart</p>
            <h2>Your order</h2>
          </div>

          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.product.id}>
                  <img src={item.product.image} alt={item.product.title} />
                  <div>
                    <h3>{item.product.title}</h3>
                    <p>{item.product.shortDescription}</p>
                    <strong>{formatPrice(item.product.price)}</strong>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.product.title}`}>
                    <button type="button" onClick={() => updateQuantity(item.product.id, -1)} aria-label="Decrease quantity">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.product.id, 1)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  <div className="cart-line-actions">
                    <button type="button" onClick={() => saveForLater(item.product)}>
                      Save for Later
                    </button>
                    <button type="button" onClick={() => removeFromCart(item.product.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>Empty Cart</span>
              <h3>Your cart is waiting for a thoughtful gift.</h3>
              <p>Add a ready-made gift pack or build a custom gift box to continue.</p>
              <a className="button primary" href="#popular-gift-packs">
                Browse Gift Packs
              </a>
            </div>
          )}

          {savedForLater.length > 0 && (
            <div className="saved-later">
              <h3>Saved for later</h3>
              {savedForLater.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => {
                    addToCart(product);
                    setSavedForLater((current) => current.filter((item) => item.id !== product.id));
                  }}
                >
                  {product.title} <span>{formatPrice(product.price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="summary-panel">
          <h3>Order Summary</h3>
          <div className="promo-row">
            <label className="sr-only" htmlFor="promo-code">
              Promo code
            </label>
            <input
              id="promo-code"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="Promo code"
            />
            <button type="button" onClick={applyPromoCode}>
              Apply
            </button>
          </div>
          <small className={promoApplied ? "promo-success" : "promo-hint"}>
            {promoApplied ? "THASHY10 applied." : "Try THASHY10 for a sample discount."}
          </small>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery charge</dt>
              <dd>{formatPrice(deliveryCharge)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>- {formatPrice(discount)}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <a className="button primary" href="#checkout">
            Proceed to Checkout
          </a>
          <button className="button secondary" type="button" onClick={() => openWhatsApp(cartWhatsAppMessage())}>
            Order Through WhatsApp
          </button>
        </aside>
      </section>

      <section className="section checkout-section" id="checkout">
        <div className="section-heading">
          <p className="eyebrow">Checkout</p>
          <h2>Simple and secure-looking checkout</h2>
          <p>Confirm delivery details, gift message and payment preference in LKR / Rs.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <div className="form-grid">
              <label className="field">
                <span>Full Name</span>
                <input name="fullName" value={checkoutForm.fullName} onChange={handleCheckoutInput} required />
              </label>
              <label className="field">
                <span>Mobile Number</span>
                <input name="mobile" value={checkoutForm.mobile} onChange={handleCheckoutInput} required />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" value={checkoutForm.email} onChange={handleCheckoutInput} />
              </label>
              <label className="field">
                <span>City</span>
                <input name="city" value={checkoutForm.city} onChange={handleCheckoutInput} required />
              </label>
              <label className="field full-field">
                <span>Delivery Address</span>
                <textarea name="address" value={checkoutForm.address} onChange={handleCheckoutInput} required />
              </label>
              <label className="field full-field">
                <span>Delivery Instructions</span>
                <textarea
                  name="instructions"
                  value={checkoutForm.instructions}
                  onChange={handleCheckoutInput}
                  placeholder="Landmarks, timing, surprise instructions..."
                />
              </label>
              <label className="field">
                <span>Recipient Name</span>
                <input name="recipientName" value={checkoutForm.recipientName} onChange={handleCheckoutInput} />
              </label>
              <label className="field">
                <span>Preferred Delivery Date</span>
                <input
                  type="date"
                  name="deliveryDate"
                  value={checkoutForm.deliveryDate}
                  onChange={handleCheckoutInput}
                />
              </label>
              <label className="field full-field">
                <span>Gift Message</span>
                <textarea name="giftMessage" value={checkoutForm.giftMessage} onChange={handleCheckoutInput} />
              </label>
              <label className="field full-field">
                <span>Payment Method</span>
                <select name="paymentMethod" value={checkoutForm.paymentMethod} onChange={handleCheckoutInput}>
                  <option>Bank Transfer</option>
                  <option>Cash on Delivery</option>
                  <option>Card Payment placeholder</option>
                </select>
              </label>
            </div>
            <button className="button primary checkout-button" type="submit" disabled={cart.length === 0}>
              Confirm Checkout
            </button>
          </form>

          <aside className="checkout-summary">
            <h3>Before confirmation</h3>
            <ul>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <li key={item.product.id}>
                    <span>{item.product.title} x {item.quantity}</span>
                    <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                  </li>
                ))
              ) : (
                <li>
                  <span>No products selected</span>
                  <strong>{formatPrice(0)}</strong>
                </li>
              )}
            </ul>
            <div className="checkout-total">
              <span>Total Amount</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p>Payment confirmation and final delivery timing can be completed through WhatsApp.</p>
          </aside>
        </div>

        {orderSuccess && (
          <div className="success-panel" role="status">
            <span>Successful Order Confirmation</span>
            <h3>Thank you. Your order details are ready.</h3>
            <p>
              Continue on WhatsApp to confirm product availability, delivery charge and payment
              instructions with Thashy Gift Hub.
            </p>
            <button className="button primary" type="button" onClick={() => openWhatsApp(cartWhatsAppMessage())}>
              Send Order on WhatsApp
            </button>
          </div>
        )}
      </section>

      <section className="section order-tracking-section">
        <div className="tracking-card">
          <div>
            <p className="eyebrow">Customer account</p>
            <h2>Order tracking placeholder</h2>
            <p>Customers can later sign in to view wishlist, order history and delivery updates.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setAccountOpen(true);
            }}
          >
            <label className="sr-only" htmlFor="tracking-number">
              Order tracking number
            </label>
            <input id="tracking-number" placeholder="Enter order number" />
            <button className="button primary" type="submit">
              Track Order
            </button>
          </form>
        </div>
      </section>

      <section className="newsletter-section">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2>Stay Updated with Thashy Gift Hub</h2>
          <p>Get updates about new gifts, special offers and seasonal collections.</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNewsletterDone(true);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            value={newsletterEmail}
            onChange={(event) => setNewsletterEmail(event.target.value)}
            required
          />
          <button className="button primary" type="submit">
            Subscribe
          </button>
          {newsletterDone && <small role="status">You are on the list for new little gift moments.</small>}
        </form>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-brand">
          <a className="brand" href="#home" aria-label="Thashy Gift Hub home">
            <span className="brand-mark">TG</span>
            <span>
              <strong>Thashy Gift Hub</strong>
              <small>Tell Us Your Budget, We Create the Gift.</small>
            </span>
          </a>
          <p>Making every little moment special with thoughtful and affordable gifts.</p>
        </div>
        <FooterColumn
          title="Quick Links"
          links={["Home", "Shop", "Gift Packs", "Build Your Gift", "About Us", "Contact"]}
        />
        <FooterColumn
          title="Customer Support"
          links={["Delivery Information", "Returns Policy", "Terms & Conditions", "Privacy Policy", "FAQ"]}
        />
        <div className="footer-column">
          <h3>Social Media</h3>
          <a href="#contact">Instagram</a>
          <a href="#contact">TikTok</a>
          <a href="#contact">Facebook</a>
          <a href={buildWhatsAppUrl("Hello Thashy Gift Hub, I need help choosing a gift.")}>WhatsApp</a>
          <div className="contact-list">
            <span>Phone: +94 77 123 4567</span>
            <span>WhatsApp: +94 77 123 4567</span>
            <span>Email: hello@thashygifthub.lk</span>
          </div>
        </div>
        <div className="footer-bottom">© Thashy Gift Hub. All Rights Reserved.</div>
      </footer>

      <a
        className="floating-whatsapp"
        href={buildWhatsAppUrl("Hello Thashy Gift Hub, I want to order a gift.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Order through WhatsApp"
      >
        WhatsApp
      </a>

      <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#wishlist">Wishlist</a>
        <a href="#cart">Cart {cartCount}</a>
        <button type="button" onClick={() => setAccountOpen(true)}>
          Account
        </button>
      </nav>

      {selectedProduct && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
          <div className="product-modal">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close">
              Close
            </button>
            <div className="gallery">
              <img src={selectedImage || selectedProduct.image} alt={selectedProduct.title} />
              <div className="gallery-thumbs">
                {[selectedProduct, ...relatedProducts].slice(0, 4).map((product) => (
                  <button type="button" key={product.id} onClick={() => setSelectedImage(product.image)}>
                    <img src={product.image} alt={product.title} />
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail">
              <span className="detail-badge">{selectedProduct.availability}</span>
              <h2 id="product-detail-title">{selectedProduct.title}</h2>
              <strong className="detail-price">{formatPrice(selectedProduct.price)}</strong>
              <p>{selectedProduct.shortDescription}</p>
              <p>{selectedProduct.detailedDescription}</p>
              <div className="rating">★★★★★ <span>{selectedProduct.rating} from {selectedProduct.reviews} reviews</span></div>
              <h3>Included items</h3>
              <ul>
                {selectedProduct.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="detail-controls">
                <div className="quantity-control">
                  <button type="button" onClick={() => setQuickQuantity((value) => Math.max(1, value - 1))}>
                    -
                  </button>
                  <span>{quickQuantity}</span>
                  <button type="button" onClick={() => setQuickQuantity((value) => Math.min(20, value + 1))}>
                    +
                  </button>
                </div>
                <button className="button primary" type="button" onClick={() => addToCart(selectedProduct, quickQuantity)}>
                  Add to Cart
                </button>
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct, quickQuantity);
                    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
                    setSelectedProduct(null);
                  }}
                >
                  Buy Now
                </button>
              </div>
              <div className="detail-link-row">
                <button type="button" onClick={() => toggleWishlist(selectedProduct.id)}>
                  {wishlist.has(selectedProduct.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      `Hello Thashy Gift Hub, I want to order ${selectedProduct.title} (${formatPrice(
                        selectedProduct.price,
                      )}). Quantity: ${quickQuantity}`,
                    )
                  }
                >
                  WhatsApp Order
                </button>
              </div>
              {relatedProducts.length > 0 && (
                <div className="related-products">
                  <h3>Related Products</h3>
                  <div>
                    {relatedProducts.map((product) => (
                      <button type="button" key={product.id} onClick={() => openProduct(product)}>
                        {product.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="related-products">
                <h3>You May Also Like</h3>
                <div>
                  {allProducts.slice(4, 7).map((product) => (
                    <button type="button" key={product.id} onClick={() => openProduct(product)}>
                      {product.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="review-list">
                <h3>Customer Reviews</h3>
                <p>“Beautifully packed and arrived on time.”</p>
                <p>“The gift looked more premium than the price.”</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {accountOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <div className="account-modal">
            <button className="modal-close" type="button" onClick={() => setAccountOpen(false)} aria-label="Close">
              Close
            </button>
            <p className="eyebrow">Customer account</p>
            <h2 id="account-title">Account area coming soon</h2>
            <p>
              This placeholder is ready for customer login, wishlist sync, saved addresses and
              order tracking in the next backend phase.
            </p>
            <div className="account-actions">
              <a className="button primary" href="#wishlist" onClick={() => setAccountOpen(false)}>
                View Wishlist
              </a>
              <a className="button secondary" href="#cart" onClick={() => setAccountOpen(false)}>
                View Cart
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductCard({
  product,
  wishlistActive,
  compact,
  onWishlist,
  onAdd,
  onView,
}: {
  product: Product;
  wishlistActive: boolean;
  compact?: boolean;
  onWishlist: () => void;
  onAdd: () => void;
  onView: () => void;
}) {
  return (
    <article className={`product-card ${compact ? "compact-product-card" : ""}`}>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
        {product.badge && <span className="badge">{product.badge}</span>}
        {product.availability === "Only a Few Left" && <span className="stock-alert">Only a Few Left</span>}
        <button
          type="button"
          className={`wishlist-button ${wishlistActive ? "active" : ""}`}
          aria-label={`${wishlistActive ? "Remove" : "Add"} ${product.title} ${wishlistActive ? "from" : "to"} wishlist`}
          onClick={onWishlist}
        >
          {wishlistActive ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-copy">
        <div>
          <span className="product-category">{product.category}</span>
          <h3>{product.title}</h3>
          <p>{product.shortDescription}</p>
        </div>
        <div className="product-meta">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          <span>{product.rating} stars</span>
        </div>
        <div className="stock-row">
          <span>{product.availability}</span>
          <span>{product.reviews} reviews</span>
        </div>
        <div className="product-actions">
          <button type="button" onClick={onAdd}>
            {compact ? "Quick Add" : "Add to Cart"}
          </button>
          <button type="button" onClick={onView}>
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`}>
          {link}
        </a>
      ))}
    </div>
  );
}
