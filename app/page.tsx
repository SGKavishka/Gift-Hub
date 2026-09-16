"use client";

/* eslint-disable @next/next/no-img-element */

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react";

type Availability = "In Stock" | "Limited" | "Preorder";
type ProductBadge = "NEW" | "POPULAR" | "SALE" | "BEST SELLER" | "CUSTOM";

type Product = {
  id: string;
  name: string;
  category: string;
  gender: string;
  recipients: string[];
  occasions: string[];
  giftTypes: string[];
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge: ProductBadge;
  availability: Availability;
  image: string;
  description: string;
  details: string[];
  createdAt: string;
  popularity: number;
};

type CartItem = {
  lineId: string;
  product: Product;
  quantity: number;
  message?: string;
};

type CheckoutForm = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  instructions: string;
  paymentMethod: string;
};

type ContactForm = {
  name: string;
  phone: string;
  message: string;
};

type LastOrder = {
  id: string;
  customer: string;
  total: number;
  items: CartItem[];
  paymentMethod: string;
};

const whatsappNumber = "94771234567";
const fallbackImage =
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80";

const navItems = [
  ["Home", "home"],
  ["Shop", "shop"],
  ["Categories", "categories"],
  ["Gift Boxes", "gift-boxes"],
  ["Custom Gift", "custom-gift"],
  ["About", "about"],
  ["Contact", "contact"],
] as const;

const categoryCards = [
  ["🎁", "Gift Items", "Curated little surprises"],
  ["🧸", "Teddy Bears", "Cute plush picks"],
  ["⌚", "Watches", "Everyday premium style"],
  ["💎", "Jewelry", "Pretty keepsakes"],
  ["📚", "Books", "Thoughtful reading gifts"],
  ["🌹", "Flowers", "Romantic and fresh"],
  ["💑", "Couple Gifts", "Matching memories"],
  ["👦", "Gifts for Boys", "Useful and stylish"],
  ["👧", "Gifts for Girls", "Soft and beautiful"],
  ["👨‍👩‍👧", "Family Gifts", "Warm family hampers"],
  ["🎂", "Birthday Gifts", "Ready for birthdays"],
  ["💝", "Custom Gift Boxes", "Built around your budget"],
] as const;

const budgetOptions = [
  { label: "Under LKR 1,000", min: 0, max: 1000 },
  { label: "LKR 1,000-2,000", min: 1000, max: 2000 },
  { label: "LKR 2,000-3,000", min: 2000, max: 3000 },
  { label: "LKR 3,000-5,000", min: 3000, max: 5000 },
  { label: "LKR 5,000+", min: 5000, max: 12000 },
] as const;

const recipientOptions = ["Boy", "Girl", "Couple", "Friend", "Family"] as const;
const occasionOptions = [
  "Birthday",
  "Anniversary",
  "Valentine's Day",
  "Graduation",
  "Wedding",
  "Thank You",
  "Just Because",
] as const;

const sriLankanDistricts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Galle",
  "Matara",
  "Kurunegala",
  "Anuradhapura",
  "Jaffna",
  "Other",
];

const products: Product[] = [
  {
    id: "cute-teddy-bear",
    name: "Cute Teddy Bear",
    category: "Teddy Bears",
    gender: "Girls",
    recipients: ["Girl", "Friend"],
    occasions: ["Birthday", "Valentine's Day", "Just Because"],
    giftTypes: ["soft toy", "cute", "plush", "teddy"],
    price: 2500,
    compareAt: 2900,
    rating: 4.9,
    reviews: 124,
    badge: "BEST SELLER",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=82",
    description: "A soft, photo-ready teddy for birthdays, apologies and sweet surprises.",
    details: ["Soft plush finish", "Ribbon wrapping", "Message tag included"],
    createdAt: "2026-08-24",
    popularity: 98,
  },
  {
    id: "rose-memory-box",
    name: "Rose Memory Gift Box",
    category: "Gift Items",
    gender: "Everyone",
    recipients: ["Girl", "Couple", "Friend"],
    occasions: ["Anniversary", "Valentine's Day", "Birthday"],
    giftTypes: ["gift box", "flowers", "chocolate", "romantic"],
    price: 3900,
    compareAt: 4500,
    rating: 4.8,
    reviews: 88,
    badge: "POPULAR",
    availability: "Limited",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=82",
    description: "A polished box with keepsakes, roses, chocolates and a personal note.",
    details: ["Artificial rose arrangement", "Mini chocolates", "Premium box", "Greeting card"],
    createdAt: "2026-07-14",
    popularity: 94,
  },
  {
    id: "minimal-black-watch",
    name: "Minimal Black Watch",
    category: "Watches",
    gender: "Boys",
    recipients: ["Boy", "Friend", "Family"],
    occasions: ["Birthday", "Graduation", "Thank You"],
    giftTypes: ["watch", "practical", "premium", "accessory"],
    price: 3200,
    rating: 4.7,
    reviews: 61,
    badge: "NEW",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82",
    description: "A clean everyday watch for brothers, partners, friends and husbands.",
    details: ["Minimal dial", "Gift sleeve", "Care card"],
    createdAt: "2026-09-04",
    popularity: 76,
  },
  {
    id: "dainty-gold-necklace",
    name: "Dainty Gold Necklace",
    category: "Jewelry",
    gender: "Girls",
    recipients: ["Girl", "Friend"],
    occasions: ["Anniversary", "Birthday", "Wedding"],
    giftTypes: ["jewelry", "necklace", "keepsake", "premium"],
    price: 2100,
    compareAt: 2600,
    rating: 4.8,
    reviews: 77,
    badge: "SALE",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=82",
    description: "An elegant necklace that feels premium while staying affordable.",
    details: ["Gift pouch", "Care card", "Ribbon wrap"],
    createdAt: "2026-06-10",
    popularity: 86,
  },
  {
    id: "book-lover-bundle",
    name: "Book Lover Bundle",
    category: "Books",
    gender: "Everyone",
    recipients: ["Friend", "Boy", "Girl"],
    occasions: ["Graduation", "Birthday", "Thank You"],
    giftTypes: ["book", "stationery", "study", "meaningful"],
    price: 1800,
    rating: 4.6,
    reviews: 39,
    badge: "NEW",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=82",
    description: "A cozy reading bundle with a notebook, bookmark and gift wrapping.",
    details: ["Lifestyle book", "Bookmark", "Mini notebook", "Paper bag"],
    createdAt: "2026-09-08",
    popularity: 67,
  },
  {
    id: "fresh-rose-bouquet",
    name: "Fresh Rose Bouquet",
    category: "Flowers",
    gender: "Everyone",
    recipients: ["Girl", "Couple", "Family"],
    occasions: ["Valentine's Day", "Anniversary", "Wedding"],
    giftTypes: ["flowers", "romantic", "bouquet", "photo-ready"],
    price: 2800,
    rating: 4.9,
    reviews: 103,
    badge: "POPULAR",
    availability: "Preorder",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=82",
    description: "A beautiful bouquet for love notes, anniversaries and wedding wishes.",
    details: ["Fresh or artificial option", "Ribbon wrap", "Message card"],
    createdAt: "2026-05-20",
    popularity: 89,
  },
  {
    id: "couple-promise-bracelets",
    name: "Couple Promise Bracelets",
    category: "Couple Gifts",
    gender: "Couples",
    recipients: ["Couple"],
    occasions: ["Anniversary", "Valentine's Day", "Just Because"],
    giftTypes: ["couple", "bracelet", "matching", "love"],
    price: 1600,
    compareAt: 1900,
    rating: 4.7,
    reviews: 58,
    badge: "SALE",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=82",
    description: "A matching pair gift for anniversaries, love boxes and little promises.",
    details: ["Two bracelets", "Gift pouch", "Couple note card"],
    createdAt: "2026-06-28",
    popularity: 81,
  },
  {
    id: "boys-everyday-gift-set",
    name: "Boys Everyday Gift Set",
    category: "Gifts for Boys",
    gender: "Boys",
    recipients: ["Boy", "Friend"],
    occasions: ["Birthday", "Graduation", "Just Because"],
    giftTypes: ["wallet", "watch", "keytag", "useful"],
    price: 4200,
    rating: 4.8,
    reviews: 72,
    badge: "BEST SELLER",
    availability: "Limited",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=82",
    description: "Useful, stylish essentials packed as a clean premium gift set.",
    details: ["Wallet", "Keytag", "Bracelet", "Gift box"],
    createdAt: "2026-04-12",
    popularity: 91,
  },
  {
    id: "girls-glow-gift-set",
    name: "Girls Glow Gift Set",
    category: "Gifts for Girls",
    gender: "Girls",
    recipients: ["Girl", "Friend"],
    occasions: ["Birthday", "Thank You", "Just Because"],
    giftTypes: ["beauty", "cute", "jewelry", "self care"],
    price: 3600,
    rating: 4.9,
    reviews: 97,
    badge: "POPULAR",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=82",
    description: "A soft self-care gift box with pretty extras and thoughtful packing.",
    details: ["Mini candle", "Jewelry pouch", "Chocolate", "Greeting card"],
    createdAt: "2026-07-30",
    popularity: 93,
  },
  {
    id: "family-sweet-hamper",
    name: "Family Sweet Hamper",
    category: "Family Gifts",
    gender: "Family",
    recipients: ["Family"],
    occasions: ["Thank You", "Wedding", "Just Because"],
    giftTypes: ["hamper", "family", "snacks", "premium"],
    price: 5200,
    rating: 4.8,
    reviews: 46,
    badge: "NEW",
    availability: "Preorder",
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=82",
    description: "A warm hamper for parents, relatives, hosts and family celebrations.",
    details: ["Assorted sweets", "Tea-time treats", "Keepsake card", "Hamper wrap"],
    createdAt: "2026-09-01",
    popularity: 70,
  },
  {
    id: "birthday-surprise-box",
    name: "Birthday Surprise Box",
    category: "Birthday Gifts",
    gender: "Everyone",
    recipients: ["Boy", "Girl", "Friend", "Family"],
    occasions: ["Birthday"],
    giftTypes: ["birthday", "surprise", "box", "balloon"],
    price: 3000,
    compareAt: 3500,
    rating: 4.9,
    reviews: 142,
    badge: "BEST SELLER",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=82",
    description: "A cheerful ready-made birthday box with sweets, decor and a card.",
    details: ["Mini decor", "Chocolate", "Card", "Wrapped box"],
    createdAt: "2026-03-01",
    popularity: 100,
  },
  {
    id: "custom-budget-gift-box",
    name: "Custom Budget Gift Box",
    category: "Custom Gift Boxes",
    gender: "Everyone",
    recipients: ["Boy", "Girl", "Couple", "Friend", "Family"],
    occasions: ["Birthday", "Anniversary", "Valentine's Day", "Graduation", "Wedding", "Thank You", "Just Because"],
    giftTypes: ["custom", "budget", "curated", "personal"],
    price: 1000,
    rating: 5,
    reviews: 156,
    badge: "CUSTOM",
    availability: "Preorder",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=82",
    description: "Tell us your budget, recipient and occasion. We create the gift.",
    details: ["Gift consultation", "Curated items", "Personal note", "Beautiful packing"],
    createdAt: "2026-01-01",
    popularity: 99,
  },
  {
    id: "graduation-keepsake-box",
    name: "Graduation Keepsake Box",
    category: "Gift Items",
    gender: "Everyone",
    recipients: ["Boy", "Girl", "Friend", "Family"],
    occasions: ["Graduation"],
    giftTypes: ["graduation", "keepsake", "photo frame", "stationery"],
    price: 4700,
    rating: 4.8,
    reviews: 32,
    badge: "NEW",
    availability: "Limited",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=82",
    description: "A milestone gift with keepsakes, stationery and a memory card.",
    details: ["Photo frame", "Notebook", "Pen", "Congratulation card"],
    createdAt: "2026-08-18",
    popularity: 73,
  },
  {
    id: "wedding-blessing-set",
    name: "Wedding Blessing Set",
    category: "Family Gifts",
    gender: "Couples",
    recipients: ["Couple", "Family"],
    occasions: ["Wedding", "Anniversary"],
    giftTypes: ["wedding", "home", "keepsake", "premium"],
    price: 6800,
    rating: 4.7,
    reviews: 27,
    badge: "POPULAR",
    availability: "Preorder",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=82",
    description: "A tasteful keepsake set for weddings, home blessings and anniversaries.",
    details: ["Photo frame", "Mini bouquet", "Greeting card", "Premium box"],
    createdAt: "2026-05-01",
    popularity: 69,
  },
  {
    id: "thank-you-candle-set",
    name: "Thank You Candle Set",
    category: "Gift Items",
    gender: "Everyone",
    recipients: ["Friend", "Family"],
    occasions: ["Thank You", "Just Because"],
    giftTypes: ["candle", "calm", "teacher", "gratitude"],
    price: 1250,
    rating: 4.6,
    reviews: 44,
    badge: "SALE",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=82",
    description: "A small calm gift for teachers, friends, hosts and family members.",
    details: ["Mini candle", "Thank-you tag", "Ribbon wrap"],
    createdAt: "2026-02-14",
    popularity: 62,
  },
  {
    id: "valentine-love-box",
    name: "Valentine Love Box",
    category: "Couple Gifts",
    gender: "Couples",
    recipients: ["Couple"],
    occasions: ["Valentine's Day", "Anniversary"],
    giftTypes: ["valentine", "chocolate", "couple", "romantic"],
    price: 4500,
    compareAt: 5100,
    rating: 5,
    reviews: 111,
    badge: "POPULAR",
    availability: "In Stock",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=82",
    description: "A romantic box with couple keepsakes, sweets and a message card.",
    details: ["Couple bracelets", "Chocolate", "Mini teddy", "Love card"],
    createdAt: "2026-01-30",
    popularity: 97,
  },
];

const reviews = [
  ["Nethmi", "The gift box was beautiful and exactly what I wanted. Thank you!", 5],
  ["Kavindu", "I told them my budget and they made a perfect birthday surprise.", 5],
  ["Ayesha", "Very neat packing, friendly WhatsApp updates and fast delivery.", 5],
  ["Dinuka", "Looks premium but still affordable. The custom card was lovely.", 5],
] as const;

const orderSteps = ["Order Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"] as const;

const formatPrice = (amount: number) => `LKR ${amount.toLocaleString("en-LK")}`;

const sanitizeText = (value: string) =>
  value.trim().replace(/[<>]/g, "").replace(/\s+/g, " ").slice(0, 500);

const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const productById = new Map(products.map((product) => [product.id, product]));

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    price: "All",
    gender: "All",
    occasion: "All",
    rating: "All",
    availability: "All",
  });
  const [sort, setSort] = useState("Popular");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickQuantity, setQuickQuantity] = useState(1);
  const [builderBudget, setBuilderBudget] = useState(budgetOptions[2].label);
  const [builderRecipient, setBuilderRecipient] = useState<(typeof recipientOptions)[number]>("Girl");
  const [builderOccasion, setBuilderOccasion] = useState<(typeof occasionOptions)[number]>("Birthday");
  const [builderItems, setBuilderItems] = useState<Set<string>>(new Set(["thank-you-candle-set"]));
  const [builderMessage, setBuilderMessage] = useState("");
  const [builderStatus, setBuilderStatus] = useState<"idle" | "success" | "error">("idle");
  const [finder, setFinder] = useState({
    recipient: "Friend",
    budget: "LKR 2,000-3,000",
    occasion: "Birthday",
    style: "cute",
  });
  const [finderUsed, setFinderUsed] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    instructions: "",
    paymentMethod: "Cash on Delivery",
  });
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string, string>>({});
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [trackInput, setTrackInput] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<"idle" | "found" | "error">("idle");
  const [accountTab, setAccountTab] = useState("Profile");
  const [contactForm, setContactForm] = useState<ContactForm>({ name: "", phone: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        const storedWishlist = JSON.parse(localStorage.getItem("thashy-wishlist") || "[]") as string[];
        const storedCart = JSON.parse(localStorage.getItem("thashy-cart") || "[]") as CartItem[];
        setWishlist(new Set(storedWishlist.filter((id) => productById.has(id))));
        setCart(Array.isArray(storedCart) ? storedCart : []);
      } catch {
        setWishlist(new Set());
        setCart([]);
      } finally {
        setHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("thashy-wishlist", JSON.stringify([...wishlist]));
  }, [hydrated, wishlist]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("thashy-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  const categoryOptions = ["All", ...categoryCards.map((category) => category[1])];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cart.length === 0 || subtotal >= 5000 ? 0 : 450;
  const total = subtotal + deliveryFee;
  const wishlistProducts = products.filter((product) => wishlist.has(product.id));
  const activeBudget = budgetOptions.find((option) => option.label === builderBudget) ?? budgetOptions[2];
  const selectedBuilderProducts = products.filter((product) => builderItems.has(product.id));
  const builderTotal = selectedBuilderProducts.reduce((sum, product) => sum + product.price, 0);
  const remainingBudget = Math.max(0, activeBudget.max - builderTotal);
  const customBoxItems = products.filter(
    (product) =>
      product.price <= activeBudget.max &&
      (product.recipients.includes(builderRecipient) || product.recipients.includes("Friend") || product.gender === "Everyone") &&
      (product.occasions.includes(builderOccasion) || product.category === "Custom Gift Boxes"),
  );

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matchesPrice = (price: number) => {
      if (filters.price === "Under LKR 1,000") return price < 1000;
      if (filters.price === "LKR 1,000-2,000") return price >= 1000 && price <= 2000;
      if (filters.price === "LKR 2,000-3,000") return price >= 2000 && price <= 3000;
      if (filters.price === "LKR 3,000-5,000") return price >= 3000 && price <= 5000;
      if (filters.price === "LKR 5,000+") return price >= 5000;
      return true;
    };

    const matchesGender = (product: Product) =>
      filters.gender === "All" || product.gender === filters.gender || product.recipients.includes(filters.gender);

    const results = products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.gender,
        product.description,
        ...product.recipients,
        ...product.occasions,
        ...product.giftTypes,
        ...product.details,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!search || searchableText.includes(search)) &&
        (filters.category === "All" || product.category === filters.category) &&
        matchesPrice(product.price) &&
        matchesGender(product) &&
        (filters.occasion === "All" || product.occasions.includes(filters.occasion)) &&
        (filters.rating === "All" || product.rating >= Number(filters.rating)) &&
        (filters.availability === "All" || product.availability === filters.availability)
      );
    });

    return results.sort((a, b) => {
      if (sort === "Newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Best Rated") return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [filters, query, sort]);

  const finderResults = useMemo(() => {
    const budget = budgetOptions.find((option) => option.label === finder.budget) ?? budgetOptions[2];
    const style = finder.style.toLowerCase();
    return products
      .filter((product) => product.price <= budget.max)
      .filter((product) => product.recipients.includes(finder.recipient) || product.gender === "Everyone")
      .filter((product) => product.occasions.includes(finder.occasion) || product.category === "Custom Gift Boxes")
      .filter((product) => product.giftTypes.some((type) => type.includes(style)) || product.description.toLowerCase().includes(style))
      .sort((a, b) => b.rating + b.popularity / 100 - (a.rating + a.popularity / 100))
      .slice(0, 4);
  }, [finder]);

  const recommendedProducts = finderResults.length > 0 ? finderResults : products.slice(0, 4);

  const addToCart = (product: Product, quantity = 1, message?: string) => {
    setCart((current) => {
      const existing = !message && current.find((item) => item.product.id === product.id && !item.message);
      if (existing) {
        return current.map((item) =>
          item.lineId === existing.lineId ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item,
        );
      }
      return [
        ...current,
        {
          lineId: `${product.id}-${Date.now()}`,
          product,
          quantity: Math.min(20, quantity),
          message,
        },
      ];
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.lineId === lineId ? { ...item, quantity: Math.min(20, Math.max(0, quantity)) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const resetFilters = () => {
    setQuery("");
    setFilters({
      category: "All",
      price: "All",
      gender: "All",
      occasion: "All",
      rating: "All",
      availability: "All",
    });
    setSort("Popular");
  };

  const selectCategory = (category: string) => {
    setFilters((current) => ({ ...current, category }));
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuickQuantity(1);
  };

  const toggleBuilderItem = (product: Product) => {
    setBuilderItems((current) => {
      const next = new Set(current);
      if (next.has(product.id)) {
        next.delete(product.id);
        return next;
      }
      const nextTotal = builderTotal + product.price;
      if (nextTotal > activeBudget.max) {
        setBuilderStatus("error");
        return next;
      }
      next.add(product.id);
      setBuilderStatus("idle");
      return next;
    });
  };

  const createGiftBox = () => {
    if (selectedBuilderProducts.length === 0) {
      setBuilderStatus("error");
      return;
    }

    const customProduct: Product = {
      id: "custom-budget-gift-box",
      name: `Custom Gift Box for ${builderRecipient}`,
      category: "Custom Gift Boxes",
      gender: builderRecipient,
      recipients: [builderRecipient],
      occasions: [builderOccasion],
      giftTypes: ["custom", "curated", "gift box"],
      price: builderTotal,
      rating: 5,
      reviews: 1,
      badge: "CUSTOM",
      availability: "Preorder",
      image: fallbackImage,
      description: `${builderOccasion} box with ${selectedBuilderProducts.map((product) => product.name).join(", ")}.`,
      details: selectedBuilderProducts.map((product) => product.name),
      createdAt: new Date().toISOString(),
      popularity: 100,
    };

    addToCart(customProduct, 1, sanitizeText(builderMessage));
    setBuilderStatus("success");
  };

  const validateCheckout = () => {
    const errors: Record<string, string> = {};
    if (cart.length === 0) errors.cart = "Please add at least one gift before checkout.";
    if (sanitizeText(checkoutForm.fullName).length < 3) errors.fullName = "Enter your full name.";
    if (!/^(\+94|0)?7\d{8}$/.test(checkoutForm.phone.replace(/\s|-/g, ""))) {
      errors.phone = "Enter a valid Sri Lankan mobile number.";
    }
    if (checkoutForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (sanitizeText(checkoutForm.address).length < 8) errors.address = "Enter your delivery address.";
    if (!checkoutForm.city.trim()) errors.city = "Enter your city.";
    if (!checkoutForm.district) errors.district = "Choose your district.";
    return errors;
  };

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateCheckout();
    setCheckoutErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const order: LastOrder = {
      id: `TGH-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
      customer: sanitizeText(checkoutForm.fullName),
      total,
      items: cart,
      paymentMethod: checkoutForm.paymentMethod,
    };
    setLastOrder(order);
    setTrackInput(order.id);
    setTrackingStatus("found");
    setCart([]);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sanitizeText(contactForm.name) || !sanitizeText(contactForm.message)) {
      setContactStatus("error");
      return;
    }
    setContactStatus("success");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const orderMessage = [
    "Hello Thashy Gift Hub, I want to place an order.",
    `Name: ${sanitizeText(checkoutForm.fullName) || "Not provided"}`,
    `Phone: ${sanitizeText(checkoutForm.phone) || "Not provided"}`,
    `Address: ${sanitizeText(checkoutForm.address) || "Not provided"}`,
    `Items: ${cart.map((item) => `${item.product.name} x ${item.quantity}`).join(", ") || "Not selected"}`,
    `Total: ${formatPrice(total)}`,
  ].join("\n");

  return (
    <main className="site-shell">
      <div className="top-bar">
        <span>🎁 Free delivery available for selected areas</span>
        <span>💝 Custom gifts available</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Thashy Gift Hub home">
          <span className="brand-mark">TG</span>
          <span>
            <strong>Thashy Gift Hub</strong>
            <small>Tell Us Your Budget, We Create the Gift.</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <form className="header-search" role="search" onSubmit={handleSearchSubmit}>
          <label className="sr-only" htmlFor="header-search">
            Search gifts
          </label>
          <input
            id="header-search"
            type="search"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <div className="header-actions">
          <a href="#wishlist" aria-label={`Wishlist with ${wishlist.size} saved items`}>
            ♡ <span>{wishlist.size}</span>
          </a>
          <a href="#cart" aria-label={`Cart with ${cartCount} items`}>
            🛒 <span>{cartCount}</span>
          </a>
          <a href="#account">Account</a>
        </div>

        <button
          className="mobile-icon-button"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          ☰
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <form role="search" onSubmit={handleSearchSubmit}>
              <label className="sr-only" htmlFor="mobile-search">
                Search gifts
              </label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>
            {navItems.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              <a href="#wishlist" onClick={() => setMobileMenuOpen(false)}>
                Wishlist {wishlist.size}
              </a>
              <a href="#cart" onClick={() => setMobileMenuOpen(false)}>
                Cart {cartCount}
              </a>
              <a href="#account" onClick={() => setMobileMenuOpen(false)}>
                Account
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Sri Lankan gift and lifestyle store</p>
          <h1>Find the Perfect Gift 🎁</h1>
          <p className="hero-subtitle">Tell Us Your Budget, We Create the Gift.</p>
          <p className="hero-description">Cute, affordable and meaningful gifts for every special moment.</p>
          <div className="hero-actions">
            <a className="button primary" href="#shop">
              Shop Gifts
            </a>
            <a className="button secondary" href="#custom-gift">
              Create My Gift Box
            </a>
          </div>
          <div className="hero-stats" aria-label="Store highlights">
            <span>1,000+ happy orders</span>
            <span>Custom boxes from LKR 1,000</span>
            <span>Islandwide delivery</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=86"
            alt="Premium wrapped gift boxes with ribbons"
            loading="eager"
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="hero-note">
            <span>Signature service</span>
            <strong>Budget-first gift curation</strong>
            <p>Tell us the person, occasion and budget. We handle the sweet part.</p>
          </div>
        </div>
      </section>

      <section className="offer-strip" aria-label="Special offer collections">
        {[
          "Gifts Under LKR 2,000 🎁",
          "Cute Gifts for Her 💝",
          "Gifts for Him 🖤",
          "Couple Collection 💑",
          "Build Your Own Gift Box",
        ].map((offer) => (
          <button
            key={offer}
            type="button"
            onClick={() => {
              if (offer.includes("Under")) setFilters((current) => ({ ...current, price: "LKR 1,000-2,000" }));
              if (offer.includes("Her")) setFilters((current) => ({ ...current, gender: "Girls" }));
              if (offer.includes("Him")) setFilters((current) => ({ ...current, gender: "Boys" }));
              if (offer.includes("Couple")) setFilters((current) => ({ ...current, category: "Couple Gifts" }));
              document.getElementById(offer.includes("Build") ? "custom-gift" : "shop")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {offer}
          </button>
        ))}
      </section>

      <section className="section" id="categories">
        <div className="section-heading">
          <p className="eyebrow">Shop by Category</p>
          <h2>Gift paths for every person and moment</h2>
          <p>Pick a category and the shop instantly filters to useful Sri Lankan gift ideas.</p>
        </div>
        <div className="category-grid">
          {categoryCards.map(([icon, name, note]) => (
            <button className="category-card" type="button" key={name} onClick={() => selectCategory(name)}>
              <span>{icon}</span>
              <strong>{name}</strong>
              <small>{note}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section shop-section" id="shop">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Shop Gifts</p>
            <h2>Premium picks, friendly prices</h2>
            <p>Search by product, category, recipient, occasion, style or keyword.</p>
          </div>
          <span className="result-count">{filteredProducts.length} gifts found</span>
        </div>

        <div className="shop-layout">
          <aside className="filters" aria-label="Product filters">
            <form className="filter-search" role="search" onSubmit={handleSearchSubmit}>
              <label htmlFor="product-search">Product Search</label>
              <input
                id="product-search"
                type="search"
                placeholder="Try teddy, couple, graduation"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>
            <FilterSelect label="Category" value={filters.category} options={categoryOptions} onChange={(value) => setFilters((current) => ({ ...current, category: value }))} />
            <FilterSelect label="Price range" value={filters.price} options={["All", ...budgetOptions.map((option) => option.label)]} onChange={(value) => setFilters((current) => ({ ...current, price: value }))} />
            <FilterSelect label="Gender" value={filters.gender} options={["All", "Boys", "Girls", "Couples", "Family", "Everyone"]} onChange={(value) => setFilters((current) => ({ ...current, gender: value }))} />
            <FilterSelect label="Occasion" value={filters.occasion} options={["All", ...occasionOptions]} onChange={(value) => setFilters((current) => ({ ...current, occasion: value }))} />
            <FilterSelect label="Rating" value={filters.rating} options={["All", "5", "4.5", "4"]} onChange={(value) => setFilters((current) => ({ ...current, rating: value }))} />
            <FilterSelect label="Availability" value={filters.availability} options={["All", "In Stock", "Limited", "Preorder"]} onChange={(value) => setFilters((current) => ({ ...current, availability: value }))} />
            <FilterSelect label="Sort" value={sort} options={["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Best Rated"]} onChange={setSort} />
            <button className="button secondary full-width" type="button" onClick={resetFilters}>
              Browse All Gifts
            </button>
          </aside>

          <div className="shop-results">
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlistActive={wishlist.has(product.id)}
                    onWishlist={() => toggleWishlist(product.id)}
                    onAdd={() => addToCart(product)}
                    onQuickView={() => openProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>No matching gifts</span>
                <h3>Sorry, we couldn&apos;t find any gifts matching your search.</h3>
                <p>Try a softer budget range, another occasion or browse every gift in the shop.</p>
                <button className="button primary" type="button" onClick={resetFilters}>
                  Browse All Gifts
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section gift-boxes" id="gift-boxes">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Gift Boxes</p>
            <h2>Ready-made boxes customers love</h2>
          </div>
          <a className="text-link" href="#custom-gift">
            Build your own
          </a>
        </div>
        <div className="collection-grid">
          {products
            .filter((product) => ["Birthday Gifts", "Couple Gifts", "Gifts for Boys", "Gifts for Girls", "Custom Gift Boxes", "Family Gifts"].includes(product.category))
            .slice(0, 6)
            .map((product) => (
              <article className="collection-card" key={product.id}>
                <img src={product.image} alt={product.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="button secondary" type="button" onClick={() => openProduct(product)}>
                    View Gift Box
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section className="section builder-section" id="custom-gift">
        <div className="section-heading">
          <p className="eyebrow">Build Your Own Gift Box 🎁</p>
          <h2>Tell Us Your Budget, We Create the Gift.</h2>
          <p>Select a budget, recipient, occasion and the items you like. We show the total before adding it to cart.</p>
        </div>

        <div className="builder-layout">
          <div className="builder-steps">
            <BuilderStep title="Step 1 - Choose Your Budget">
              <div className="chip-grid">
                {budgetOptions.map((option) => (
                  <button
                    className={builderBudget === option.label ? "chip-button active" : "chip-button"}
                    type="button"
                    key={option.label}
                    onClick={() => {
                      setBuilderBudget(option.label);
                      setBuilderStatus("idle");
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </BuilderStep>
            <BuilderStep title="Step 2 - Choose Recipient">
              <div className="chip-grid">
                {recipientOptions.map((option) => (
                  <button className={builderRecipient === option ? "chip-button active" : "chip-button"} type="button" key={option} onClick={() => setBuilderRecipient(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </BuilderStep>
            <BuilderStep title="Step 3 - Choose Occasion">
              <div className="chip-grid">
                {occasionOptions.map((option) => (
                  <button className={builderOccasion === option ? "chip-button active" : "chip-button"} type="button" key={option} onClick={() => setBuilderOccasion(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </BuilderStep>
            <BuilderStep title="Step 4 - Select Items">
              <div className="builder-items">
                {customBoxItems.slice(0, 8).map((product) => (
                  <button
                    type="button"
                    className={builderItems.has(product.id) ? "builder-item selected" : "builder-item"}
                    key={product.id}
                    onClick={() => toggleBuilderItem(product)}
                  >
                    <img src={product.image} alt={product.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
                    <span>{product.name}</span>
                    <strong>{formatPrice(product.price)}</strong>
                  </button>
                ))}
              </div>
            </BuilderStep>
            <BuilderStep title="Step 5 - Personal Message">
              <label className="field">
                <span>Write your special message...</span>
                <textarea value={builderMessage} onChange={(event) => setBuilderMessage(event.target.value)} placeholder="Write your special message..." />
              </label>
            </BuilderStep>
          </div>

          <aside className="builder-summary">
            <h3>Selected Items</h3>
            {selectedBuilderProducts.length > 0 ? (
              <ul>
                {selectedBuilderProducts.map((product) => (
                  <li key={product.id}>
                    <span>{product.name}</span>
                    <strong>{formatPrice(product.price)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items selected yet.</p>
            )}
            <dl>
              <div>
                <dt>Total Price</dt>
                <dd>{formatPrice(builderTotal)}</dd>
              </div>
              <div>
                <dt>Remaining Budget</dt>
                <dd>{formatPrice(remainingBudget)}</dd>
              </div>
            </dl>
            {builderStatus === "error" && <p className="form-error">Choose items within your selected budget.</p>}
            {builderStatus === "success" && <p className="form-success">Your custom gift box was added to cart.</p>}
            <button className="button primary full-width" type="button" onClick={createGiftBox}>
              Create My Gift Box
            </button>
          </aside>
        </div>
      </section>

      <section className="section finder-section">
        <div className="section-heading">
          <p className="eyebrow">Not Sure What to Buy? 🤔</p>
          <h2>Answer a few quick questions</h2>
        </div>
        <div className="finder-layout">
          <form
            className="finder-form"
            onSubmit={(event) => {
              event.preventDefault();
              setFinderUsed(true);
            }}
          >
            <FilterSelect label="Who are you buying for?" value={finder.recipient} options={[...recipientOptions]} onChange={(value) => setFinder((current) => ({ ...current, recipient: value }))} />
            <FilterSelect label="What is your budget?" value={finder.budget} options={budgetOptions.map((option) => option.label)} onChange={(value) => setFinder((current) => ({ ...current, budget: value }))} />
            <FilterSelect label="What is the occasion?" value={finder.occasion} options={[...occasionOptions]} onChange={(value) => setFinder((current) => ({ ...current, occasion: value }))} />
            <FilterSelect label="What type of gift do they like?" value={finder.style} options={["cute", "premium", "romantic", "practical", "meaningful"]} onChange={(value) => setFinder((current) => ({ ...current, style: value }))} />
            <button className="button primary" type="submit">
              Recommend Gifts
            </button>
          </form>
          <div className="finder-results" aria-live="polite">
            <h3>{finderUsed ? "Recommended gifts" : "Popular recommendations"}</h3>
            {recommendedProducts.map((product) => (
              <button className="finder-result" type="button" key={product.id} onClick={() => openProduct(product)}>
                <img src={product.image} alt={product.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
                <span>{product.name}</span>
                <strong>{formatPrice(product.price)}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section wishlist-section" id="wishlist">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Wishlist</p>
            <h2>Saved gift ideas</h2>
          </div>
          <span className="result-count">{wishlistProducts.length} saved</span>
        </div>
        {wishlistProducts.length > 0 ? (
          <div className="product-grid compact-grid">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlistActive
                onWishlist={() => toggleWishlist(product.id)}
                onAdd={() => addToCart(product)}
                onQuickView={() => openProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>Your wishlist is empty</span>
            <h3>Save your favourite gifts while browsing.</h3>
            <p>Wishlist items stay on this device and can be moved to cart later.</p>
            <a className="button primary" href="#shop">
              Browse Gifts
            </a>
          </div>
        )}
      </section>

      <section className="section cart-section" id="cart">
        <div className="cart-panel">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Cart</p>
            <h2>Your shopping cart</h2>
          </div>
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.lineId}>
                  <img src={item.product.image} alt={item.product.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
                  <div className="cart-copy">
                    <h3>{item.product.name}</h3>
                    <p>{item.message || item.product.description}</p>
                    <span>{formatPrice(item.product.price)}</span>
                  </div>
                  <div className="quantity-control">
                    <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.lineId, item.quantity - 1)}>
                      -
                    </button>
                    <strong>{item.quantity}</strong>
                    <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.lineId, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                  <button className="text-button" type="button" onClick={() => setCart((current) => current.filter((line) => line.lineId !== item.lineId))}>
                    Remove
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>Cart is empty</span>
              <h3>Your cart is ready for a thoughtful gift.</h3>
              <p>Add a product or create a custom box to continue.</p>
              <a className="button primary" href="#shop">
                Continue Shopping
              </a>
            </div>
          )}
        </div>
        <aside className="order-summary">
          <h3>Order Summary</h3>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery Fee</dt>
              <dd>{deliveryFee === 0 && cart.length > 0 ? "Free" : formatPrice(deliveryFee)}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <a className="button secondary full-width" href="#shop">
            Continue Shopping
          </a>
          <a className="button primary full-width" href="#checkout">
            Proceed to Checkout
          </a>
        </aside>
      </section>

      <section className="section checkout-section" id="checkout">
        <div className="section-heading">
          <p className="eyebrow">Checkout</p>
          <h2>Clean, simple order details</h2>
        </div>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleCheckoutSubmit} noValidate>
            {checkoutErrors.cart && <p className="form-error">{checkoutErrors.cart}</p>}
            <div className="form-grid">
              <FormField label="Full Name" error={checkoutErrors.fullName}>
                <input name="fullName" value={checkoutForm.fullName} onChange={(event) => setCheckoutForm((current) => ({ ...current, fullName: event.target.value }))} autoComplete="name" />
              </FormField>
              <FormField label="Phone Number" error={checkoutErrors.phone}>
                <input name="phone" value={checkoutForm.phone} onChange={(event) => setCheckoutForm((current) => ({ ...current, phone: event.target.value }))} inputMode="tel" autoComplete="tel" />
              </FormField>
              <FormField label="Email" error={checkoutErrors.email}>
                <input name="email" type="email" value={checkoutForm.email} onChange={(event) => setCheckoutForm((current) => ({ ...current, email: event.target.value }))} autoComplete="email" />
              </FormField>
              <FormField label="City" error={checkoutErrors.city}>
                <input name="city" value={checkoutForm.city} onChange={(event) => setCheckoutForm((current) => ({ ...current, city: event.target.value }))} />
              </FormField>
              <FormField label="District" error={checkoutErrors.district}>
                <select name="district" value={checkoutForm.district} onChange={(event) => setCheckoutForm((current) => ({ ...current, district: event.target.value }))}>
                  <option value="">Select district</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district}>{district}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Payment Options">
                <select name="paymentMethod" value={checkoutForm.paymentMethod} onChange={(event) => setCheckoutForm((current) => ({ ...current, paymentMethod: event.target.value }))}>
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>Online Payment placeholder</option>
                </select>
              </FormField>
              <FormField label="Delivery Address" error={checkoutErrors.address} full>
                <textarea name="address" value={checkoutForm.address} onChange={(event) => setCheckoutForm((current) => ({ ...current, address: event.target.value }))} />
              </FormField>
              <FormField label="Special Instructions" full>
                <textarea name="instructions" value={checkoutForm.instructions} onChange={(event) => setCheckoutForm((current) => ({ ...current, instructions: event.target.value }))} />
              </FormField>
            </div>
            <button className="button primary full-width" type="submit">
              Place Order
            </button>
          </form>

          <aside className="checkout-summary">
            <h3>Order summary</h3>
            {(lastOrder?.items.length ? lastOrder.items : cart).map((item) => (
              <div className="summary-line" key={item.lineId}>
                <span>{item.product.name} x {item.quantity}</span>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="summary-line">
              <span>Delivery</span>
              <strong>{formatPrice(deliveryFee)}</strong>
            </div>
            <div className="summary-line summary-total">
              <span>Total</span>
              <strong>{formatPrice(lastOrder?.total ?? total)}</strong>
            </div>
            <a className="button secondary full-width" href={buildWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </aside>
        </div>
        {lastOrder && (
          <div className="success-panel" role="status">
            <span>Success</span>
            <h3>Order {lastOrder.id} is ready for confirmation.</h3>
            <p>We saved your order summary on this page. Send it on WhatsApp or track the status below.</p>
          </div>
        )}
      </section>

      <section className="section tracking-section" id="tracking">
        <div className="section-heading">
          <p className="eyebrow">Order Tracking</p>
          <h2>Follow your gift from order to delivery</h2>
        </div>
        <form
          className="tracking-form"
          onSubmit={(event) => {
            event.preventDefault();
            setTrackingStatus(trackInput.trim().length >= 6 ? "found" : "error");
          }}
        >
          <label className="sr-only" htmlFor="tracking-id">
            Order number
          </label>
          <input id="tracking-id" value={trackInput} onChange={(event) => setTrackInput(event.target.value)} placeholder="Example: TGH-2026-1234" />
          <button className="button primary" type="submit">
            Track Order
          </button>
        </form>
        {trackingStatus === "error" && <p className="form-error">Enter a valid order number to view tracking.</p>}
        <div className="timeline" aria-label="Order status timeline">
          {orderSteps.map((step, index) => (
            <div className={trackingStatus === "found" && index <= 2 ? "timeline-step active" : "timeline-step"} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section account-section" id="account">
        <div className="section-heading">
          <p className="eyebrow">User Account</p>
          <h2>Your Thashy dashboard</h2>
        </div>
        <div className="account-layout">
          <nav className="account-tabs" aria-label="Account sections">
            {["Profile", "My Orders", "Wishlist", "Saved Addresses", "Order Tracking", "Logout"].map((tab) => (
              <button className={accountTab === tab ? "active" : ""} type="button" key={tab} onClick={() => setAccountTab(tab)}>
                {tab}
              </button>
            ))}
          </nav>
          <div className="account-panel">
            <h3>{accountTab}</h3>
            {accountTab === "Profile" && <p>Guest customer profile for quick checkout. Sign-in can be connected in the next backend phase.</p>}
            {accountTab === "My Orders" && <p>{lastOrder ? `${lastOrder.id} - ${formatPrice(lastOrder.total)} - Preparing` : "No orders yet."}</p>}
            {accountTab === "Wishlist" && <p>{wishlistProducts.length ? `${wishlistProducts.length} saved gifts in your wishlist.` : "Your wishlist is empty."}</p>}
            {accountTab === "Saved Addresses" && <p>{checkoutForm.address || "No saved delivery address yet."}</p>}
            {accountTab === "Order Tracking" && <p>{lastOrder ? `${lastOrder.id} is currently Preparing.` : "Place an order to see tracking here."}</p>}
            {accountTab === "Logout" && <p>You are browsing as a guest. Your cart and wishlist stay on this device.</p>}
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Customer Reviews</p>
            <h2>Little gifts, lovely reactions</h2>
          </div>
          <span className="result-count">★★★★★ 4.9 average</span>
        </div>
        <div className="review-track">
          {reviews.map(([name, review, rating]) => (
            <article className="review-card" key={name}>
              <span>{"★".repeat(rating)}</span>
              <p>“{review}”</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-media">
          <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1100&q=82" alt="Gift shopping and wrapping details" loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
        </div>
        <div>
          <p className="eyebrow">About Thashy Gift Hub</p>
          <h2>Affordable, cute and meaningful gifts with a personal touch</h2>
          <p>
            Thashy Gift Hub creates ready-made and custom gift boxes for birthdays, anniversaries, Valentine&apos;s Day, weddings, graduations and everyday surprises across Sri Lanka.
          </p>
          <div className="about-points">
            {["Affordable prices", "Custom gift boxes", "Wide product selection", "Personal touch", "Sri Lankan delivery"].map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Need help choosing a gift?</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-details">
            <a href="tel:+94771234567">Phone: +94 77 123 4567</a>
            <a href={buildWhatsAppUrl("Hello Thashy Gift Hub, I need help choosing a gift.")} target="_blank" rel="noreferrer">
              WhatsApp: +94 77 123 4567
            </a>
            <a href="mailto:hello@thashygifthub.lk">Email: hello@thashygifthub.lk</a>
            <span>Business location: Colombo, Sri Lanka</span>
            <span>Social: Facebook · Instagram · TikTok</span>
            <a className="button primary" href={buildWhatsAppUrl("Hello Thashy Gift Hub, I want to create a custom gift.")} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <FormField label="Contact Name">
              <input value={contactForm.name} onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))} />
            </FormField>
            <FormField label="Phone">
              <input value={contactForm.phone} onChange={(event) => setContactForm((current) => ({ ...current, phone: event.target.value }))} inputMode="tel" />
            </FormField>
            <FormField label="Message" full>
              <textarea value={contactForm.message} onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))} />
            </FormField>
            {contactStatus === "error" && <p className="form-error">Please add your name and message.</p>}
            {contactStatus === "success" && <p className="form-success">Message ready. We will reply through your preferred contact method.</p>}
            <button className="button primary" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">TG</span>
            <span>
              <strong>Thashy Gift Hub</strong>
              <small>Tell Us Your Budget, We Create the Gift.</small>
            </span>
          </a>
          <p>Affordable, cute and meaningful Sri Lankan gifts for every special moment.</p>
        </div>
        <FooterColumn title="Quick Links" links={[["Home", "#home"], ["Shop", "#shop"], ["Gift Boxes", "#gift-boxes"], ["About", "#about"], ["Contact", "#contact"]]} />
        <FooterColumn title="Customer Service" links={[["Shipping", "#contact"], ["Returns", "#contact"], ["FAQ", "#contact"], ["Privacy Policy", "#contact"], ["Terms & Conditions", "#contact"]]} />
        <FooterColumn title="Follow Us" links={[["Facebook", "#contact"], ["Instagram", "#contact"], ["TikTok", "#contact"], ["WhatsApp", buildWhatsAppUrl("Hello Thashy Gift Hub.")]]} />
        <div className="footer-bottom">© 2026 Thashy Gift Hub. All Rights Reserved.</div>
      </footer>

      <nav className="mobile-dock" aria-label="Mobile quick actions">
        <a href="#shop" aria-label="Search and shop gifts">⌕</a>
        <a href="#wishlist" aria-label="Wishlist">♡</a>
        <a href="#cart" aria-label={`Cart with ${cartCount} items`}>🛒</a>
      </nav>

      {selectedProduct && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
          <div className="product-modal">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close quick view">
              ×
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
            <div className="product-detail">
              <span>{selectedProduct.badge}</span>
              <h2 id="quick-view-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>{formatPrice(selectedProduct.price)}</strong>
              <div className="rating">★★★★★ {selectedProduct.rating} ({selectedProduct.reviews})</div>
              <ul>
                {selectedProduct.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="modal-actions">
                <div className="quantity-control">
                  <button type="button" onClick={() => setQuickQuantity((value) => Math.max(1, value - 1))}>
                    -
                  </button>
                  <strong>{quickQuantity}</strong>
                  <button type="button" onClick={() => setQuickQuantity((value) => Math.min(20, value + 1))}>
                    +
                  </button>
                </div>
                <button className="button primary" type="button" onClick={() => addToCart(selectedProduct, quickQuantity)}>
                  Add to Cart
                </button>
                <button className="button secondary" type="button" onClick={() => toggleWishlist(selectedProduct.id)}>
                  {wishlist.has(selectedProduct.id) ? "Remove Wishlist" : "Add Wishlist"}
                </button>
              </div>
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
  onWishlist,
  onAdd,
  onQuickView,
}: {
  product: Product;
  wishlistActive: boolean;
  onWishlist: () => void;
  onAdd: () => void;
  onQuickView: () => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" onError={(event) => (event.currentTarget.src = fallbackImage)} />
        <span className="badge">{product.badge}</span>
        <button className={wishlistActive ? "wishlist-button active" : "wishlist-button"} type="button" onClick={onWishlist} aria-label={`${wishlistActive ? "Remove from" : "Add to"} wishlist`}>
          {wishlistActive ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-copy">
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
        </div>
        <div className="rating">★★★★★ <small>{product.rating} · {product.availability}</small></div>
        <div className="product-actions">
          <button type="button" onClick={onAdd}>
            Add to Cart
          </button>
          <button type="button" onClick={onQuickView}>
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
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select value={value} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function BuilderStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="builder-step">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function FormField({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "field full-field" : "field"}>
      <span>{label}</span>
      {children}
      {error && <small className="form-error">{error}</small>}
    </label>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map(([label, href]) => (
        <a href={href} key={label}>
          {label}
        </a>
      ))}
    </div>
  );
}
