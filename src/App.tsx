import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Coffee,
  Utensils,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ChevronUp,
  MessageCircle,
  Star,
  ChevronRight,
  Menu as MenuIcon,
  X
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Offers', href: '#offers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img src="/bloodysweet.jpeg" alt="Bloody Sweet Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
          <span className="text-2xl font-bold tracking-tighter text-gold">
            BLOODY SWEET
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-coffee-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass flex flex-col items-center py-8 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest font-medium hover:text-gold"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="/hero.jpeg"
          alt="Coffee Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-20 text-center px-6 flex flex-col items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          src="/bloodysweet.jpeg"
          alt="Bloody Sweet Logo"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-8 shadow-[0_0_40px_rgba(212,175,55,0.4)] border-4 border-gold/30"
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl font-black mb-4 text-gold drop-shadow-2xl"
        >
          BLOODY SWEET
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-12 text-coffee-light"
        >
          Where Crispy Meets Comfort
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gold text-coffee-dark font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all"
          >
            View Menu
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-coffee-cream text-coffee-cream font-bold uppercase tracking-widest rounded-full hover:bg-coffee-cream hover:text-coffee-dark transition-all"
          >
            Visit Us
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-coffee-cream opacity-50"
      >
        <div className="w-6 h-10 border-2 border-coffee-cream rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-coffee-cream rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-coffee-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-row gap-16 items-center">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-full bg-gold/10 text-gold mb-6"
          >
            <Utensils size={32} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 text-coffee-cream"
          >
            The Bloody Sweet Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-coffee-light leading-relaxed mb-10"
          >
            Bloody Sweet Cafe is a cozy destination for coffee lovers and dessert enthusiasts in Vinobanagar, Shimoga.
            We serve freshly brewed coffee, delicious milkshakes, desserts, and snacks in a stylish and relaxing atmosphere.
            Our mission is to provide a premium experience where every sip and every bite feels like a luxury.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Fresh Brew', icon: <Coffee /> },
              { label: 'Tasty Snacks', icon: <Utensils /> },
              { label: 'Cozy Vibe', icon: <MapPin /> },
              { label: 'Open Late', icon: <Clock /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gold">
                  {item.icon}
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-coffee-light">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuCard = ({ item }: { item: any, key?: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full h-80 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass rounded-3xl overflow-hidden shadow-xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-2/3 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-6 flex flex-col justify-center items-center h-1/3">
            <h3 className="text-xl font-bold text-coffee-cream">{item.name}</h3>
            <div className="w-12 h-1 bg-gold mt-2 rounded-full" />
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl border-2 border-gold/30">
          <h3 className="text-2xl font-bold text-gold mb-4">{item.name}</h3>
          <p className="text-coffee-cream/80 text-sm mb-6 leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Menu = () => {
  const categories = [
    {
      title: 'Our Special Dishes',
      items: [
        { name: 'Spicy Ramen', price: '180', description: 'Authentic spicy broth with perfectly cooked noodles and fresh toppings.', image: '/raman_bowl1.jpeg' },
        { name: 'Korean Ramen', price: '200', description: 'Rich, comforting Korean-style ramen with a fiery kick.', image: '/raman_bowl2.jpeg' },
        { name: 'Spicy Chicken Wings', price: '220', description: 'Deep-fried chicken wings tossed in our special bloody hot sauce.', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    {
      title: 'Momos',
      items: [
        { name: 'Schezwan Momos', price: '140', description: 'Spicy and tangy momos tossed in authentic Schezwan sauce.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400' },
        { name: 'Paneer Momos', price: '150', description: 'Soft dumplings filled with spiced paneer and aromatic herbs.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=400' },
        { name: 'Chicken Momos', price: '160', description: 'Juicy minced chicken stuffed perfectly in delicate dumplings.', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=400' },
        { name: 'Momos Shots', price: '130', description: 'Bite-sized crispy fried momos served with a fiery red chutney.', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    {
      title: 'Milkshakes',
      items: [
        { name: 'Vanilla Milkshake', price: '130', description: 'Classic creamy vanilla blend topped with whipped cream.', image: '/van.jpg' },
        { name: 'Strawberry Milkshake', price: '150', description: 'Fresh strawberries blended with premium vanilla ice cream.', image: '/straw.jpg' },
        { name: 'Chocolate Milkshake', price: '160', description: 'Decadent Belgian chocolate blended with creamy milk.', image: '/choco.jpg' },
        { name: 'Oreo Milkshake', price: '170', description: 'Classic Oreo cookies crushed and blended into a thick shake.', image: '/oreo.jpg' },
      ]
    },
    {
      title: 'Desserts',
      items: [
        { name: 'Brownies', price: '140', description: 'Warm, fudgy chocolate brownie served with vanilla ice cream.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400' },
        { name: 'Waffles', price: '180', description: 'Crispy golden waffles topped with maple syrup and berries.', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=400' },
        { name: 'Ice Cream', price: '100', description: 'Three scoops of your favorite premium ice cream flavors.', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    {
      title: 'Snacks',
      items: [
        { name: 'French Fries', price: '110', description: 'Golden crispy fries seasoned with our secret spice mix.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400' },
        { name: 'Sandwiches', price: '140', description: 'Grilled sandwich with fresh veggies and melted cheese.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400' },
        { name: 'Burgers', price: '160', description: 'Juicy patty with lettuce, tomato, and our signature sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].title);

  return (
    <section id="menu" className="py-24 px-6 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-cream">Our Menu</h2>
          <p className="text-gold uppercase tracking-widest font-bold text-sm">Crafted with Love</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(cat.title)}
              className={`px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all ${activeTab === cat.title ? 'bg-gold text-coffee-dark shadow-lg' : 'glass text-coffee-cream hover:bg-white/10'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.find(c => c.title === activeTab)?.items.map((item, i) => (
            <MenuCard key={i} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Offers = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const deals = [
    { title: 'Monday Magic', image: '/monday_offer.jpeg' },
    { title: 'Wednesday Wow', image: '/wednesday_offer.jpeg' },
    { title: 'Saturday Surprise', image: '/saturday_offer.jpeg' },
  ];

  return (
    <section id="offers" className="py-24 px-6 bg-coffee-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-cream">Our Offers</h2>
          <p className="text-gold uppercase tracking-widest font-bold text-sm">Grab The Best Deals</p>
        </div>

        {/* Daily Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(deal.image)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden glass group shadow-xl border-2 border-transparent hover:border-gold/50 cursor-pointer"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=600"; // Fallback image if user hasn't uploaded yet
                  e.currentTarget.classList.add("grayscale", "opacity-50");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-gold drop-shadow-md">{deal.title}</h3>
                <span className="text-coffee-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Click to learn more
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Special Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full relative rounded-[2rem] overflow-hidden glass shadow-2xl border-2 border-gold/30"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-[#3d2c20] to-coffee-dark opacity-80" />

          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1">
              <div className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/50">
                Exclusive Discount
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 italic">STUDENT SPECIAL</h3>
              <p className="text-xl text-coffee-cream">Show your valid Student ID & grab</p>
            </div>

            <div className="mx-8 md:w-px md:h-24 bg-gold/30 hidden md:block" />

            <div className="flex-1 flex flex-col items-center md:items-end justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl md:text-7xl font-black text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              >
                10% OFF
              </motion.div>
              <p className="text-coffee-light uppercase tracking-widest font-bold text-sm mt-3 border-t-2 border-coffee-cream pt-2">
                On total bill • Every Day
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full glass text-coffee-cream hover:text-white hover:bg-white/10 transition-colors z-[101]"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              src={selectedImage}
              alt="Offer Details"
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Gallery = () => {
  const images = [
    '/gal1.jpeg',
    '/gal2.jpeg',
    '/bloodysweet.jpeg',
    '/choco.jpg',
    '/oreo.jpg',
    '/straw.jpg',
  ];

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-cream">Gallery</h2>
          <p className="text-gold uppercase tracking-widest font-bold text-sm">
            Capturing Sweet Moments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                borderColor: "rgba(212, 175, 55, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square overflow-hidden rounded-3xl glass group border border-transparent"
            >
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-gold/20 p-4 rounded-full backdrop-blur-sm border border-gold/30">
                  <Instagram className="text-gold" size={32} />
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Reviews = () => {
  const reviews = [
    { name: "Mani", text: "Best cafe in Vinobanagar! Amazing Crispy Chicken and cozy vibe.", rating: 5 },
    { name: "Priya K.", text: "The waffles are to die for. Love the dark luxury aesthetic here.", rating: 5 },
    { name: "Anish Gowda", text: "Perfect spot for a late-night coffee. The staff is very friendly.", rating: 4 },
  ];

  return (
    <section id="reviews" className="py-24 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-cream">Customer Reviews</h2>
          <p className="text-gold uppercase tracking-widest font-bold text-sm">What they say about us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl shadow-lg border-t-2 border-gold/20"
            >
              <div className="flex gap-1 mb-4 text-gold">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} fill={j < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-coffee-cream/80 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {review.name[0]}
                </div>
                <span className="font-bold text-coffee-cream">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomerVideos = () => {
  const videos = [
    {
      id: 1,
      src: "/review1.mp4",
      isVideo: true,
      title: "Cafe Experience"
    },
    {
      id: 2,
      src: "/review2.mp4",
      isVideo: true,
      title: "Cafe Experience"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
      isVideo: false,
      title: "Waffle Review",
      duration: "0:58"
    }
  ];

  return (
    <section id="videos" className="py-24 px-6 bg-coffee-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-coffee-cream">Customer Stories</h2>
          <p className="text-gold uppercase tracking-widest font-bold text-sm">Watch their experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative aspect-[9/16] rounded-[2rem] overflow-hidden glass group cursor-pointer border border-white/10"
            >
              {video.isVideo ? (
                <video
                  src={video.src}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10 relative"
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={video.src}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center text-coffee-dark shadow-[0_0_30px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform">
                  <ChevronRight size={32} fill="currentColor" />
                </div>
              </div>

              {/* Video Info */}
              {!video.isVideo && (
                <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                  <h4 className="text-xl font-bold text-coffee-cream mb-1">{video.title}</h4>
                  <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                    <Clock size={12} /> {video.duration}
                  </div>
                </div>
              )}

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-[2rem] transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-coffee-cream">Visit Us</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-coffee-cream mb-2">Location</h4>
                  <p className="text-coffee-light">
                    Near Sai Baba Temple, 60 Feet Road,<br />
                    7th Cross, Vinobanagar Auto Complex,<br />
                    Shimoga, Karnataka
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-coffee-cream mb-2">Opening Hours</h4>
                  <p className="text-coffee-light">Daily: 12:00 PM – 10:30 PM</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-coffee-cream mb-2">Contact</h4>
                  <p className="text-coffee-light mb-4">+91 9148609833</p>
                  <div className="flex gap-4">
                    <a
                      href="tel:+919148609833"
                      className="px-6 py-2 bg-gold text-coffee-dark rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                    >
                      <Phone size={16} /> Call
                    </a>
                    <a
                      href="https://wa.me/919148609833"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[#25D366] text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold shrink-0">
                  <Instagram size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-coffee-cream mb-2">Social</h4>
                  <p className="text-coffee-light mb-4">@bsc_07</p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/bsc_07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                    >
                      <Instagram size={16} /> Follow Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-3xl overflow-hidden glass shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.245814521453!2d75.55925521534888!3d13.944671796064436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbaf000c3750df%3A0x82c42acfbb0b5b4a!2sBLOODY%20SWEET!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Maps Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-black/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-gold mb-4">BLOODY SWEET</h2>
          <p className="text-coffee-light max-w-xs">
            Premium coffee and desserts in the heart of Shimoga.
          </p>
        </div>

        <div className="flex gap-8">
          {[
            { icon: <Instagram />, href: '#' },
            { icon: <Facebook />, href: '#' },
            { icon: <Twitter />, href: '#' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-coffee-cream hover:text-gold hover:scale-110 transition-all"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-coffee-light text-sm mb-2">© 2024 Bloody Sweet Cafe. All rights reserved.</p>
          <p className="text-coffee-light/50 text-xs uppercase tracking-widest">Designed by Siddu💙</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="font-sans selection:bg-gold selection:text-coffee-dark">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Menu />
        <Offers />
        <Gallery />
        <Reviews />
        <CustomerVideos />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919148609833"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-40 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={32} />
      </a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 glass text-gold rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <ChevronUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
