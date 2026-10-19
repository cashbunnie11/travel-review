// All place data lives here so you can add or edit places without touching the main code.
// To add a new place: copy one object, change the values, and add a matching image in /images.

const PLACES = [
  {
    id: "zermatt",
    name: "Zermatt",
    type: "mountain",
    rating: 4.8,
    image: "images/zermatt.svg",
    summary: "A car-free alpine village at the foot of the Matterhorn.",
    review:
      "Zermatt feels like a postcard come to life. The village is car-free, so the air is crisp and the streets are calm. The Gornergrat railway gives close views of the Matterhorn and dozens of other peaks, and the hiking trails suit both beginners and experts. It is pricey, but the scenery justifies it.",
    highlights: ["Gornergrat cogwheel train", "Matterhorn views", "Skiing and hiking trails"],
    info: ["Best time: Jun-Sep and Dec-Mar", "Car-free village", "Budget: High"]
  },
  {
    id: "interlaken",
    name: "Interlaken",
    type: "lake",
    rating: 4.5,
    image: "images/interlaken.svg",
    summary: "The adventure capital between two turquoise lakes.",
    review:
      "Sitting between Lake Thun and Lake Brienz, Interlaken is the perfect base for adventure lovers. Paragliding, canyoning and boat rides are all close by, and the town has plenty of cafes and hostels. It can get busy in summer, but the views of the Jungfrau region make up for the crowds.",
    highlights: ["Paragliding over the lakes", "Boat trips on Lake Brienz", "Harder Kulm viewpoint"],
    info: ["Best time: May-Sep", "Great train connections", "Budget: Medium-High"]
  },
  {
    id: "lucerne",
    name: "Lucerne",
    type: "lake",
    rating: 4.7,
    image: "images/lucerne.svg",
    summary: "Medieval bridges, a calm lake and Mount Pilatus.",
    review:
      "Lucerne is charming and easy to explore on foot. The wooden Chapel Bridge and the old town are lovely at sunset, and a lake cruise is relaxing. A day trip up Mount Pilatus rewards you with sweeping views. It is a great choice for first-time visitors who want culture and nature together.",
    highlights: ["Chapel Bridge (Kapellbrucke)", "Lake Lucerne cruise", "Mount Pilatus day trip"],
    info: ["Best time: Apr-Oct", "Very walkable", "Budget: Medium-High"]
  },
  {
    id: "lauterbrunnen",
    name: "Lauterbrunnen",
    type: "mountain",
    rating: 4.9,
    image: "images/lauterbrunnen.svg",
    summary: "A deep green valley with dozens of waterfalls.",
    review:
      "Lauterbrunnen was my favourite stop. The valley is framed by tall cliffs and more than seventy waterfalls, including the famous Staubbach Falls. Quiet village walks are free, and the trails to Murren and Wengen are unforgettable. Book accommodation early because rooms fill up fast.",
    highlights: ["Staubbach and Trummelbach Falls", "Walk to Murren", "Peaceful village life"],
    info: ["Best time: Jun-Sep", "Book stays early", "Budget: Medium"]
  },
  {
    id: "jungfraujoch",
    name: "Jungfraujoch",
    type: "mountain",
    rating: 4.6,
    image: "images/jungfraujoch.svg",
    summary: "The 'Top of Europe' at 3,454 metres above sea level.",
    review:
      "Reaching Europe's highest railway station is a bucket-list moment. You ride a train through the mountain itself, then step out onto a glacier plateau with endless snow views. Tickets are expensive and clouds can hide the view, so check the webcam first and go on a clear morning.",
    highlights: ["Aletsch Glacier views", "Ice Palace", "Sphinx Observatory"],
    info: ["Altitude: 3,454 m", "Dress warmly", "Budget: Very High"]
  },
  {
    id: "zurich",
    name: "Zurich",
    type: "city",
    rating: 4.3,
    image: "images/zurich.svg",
    summary: "Switzerland's largest city with an old town and a lakefront.",
    review:
      "Zurich mixes a pretty old town with a modern, buzzing energy. You can stroll along Lake Zurich, browse Bahnhofstrasse, visit excellent museums and swim in the river during summer. It is more expensive than other cities, but it is a very convenient starting point with an international airport.",
    highlights: ["Old Town (Altstadt)", "Lake Zurich promenade", "Great museums"],
    info: ["Best time: May-Sep", "Main airport hub", "Budget: Very High"]
  },
  {
    id: "montreux",
    name: "Montreux",
    type: "lake",
    rating: 4.4,
    image: "images/montreux.svg",
    summary: "A sunny Lake Geneva town with a fairytale castle.",
    review:
      "Montreux has a mild climate and a relaxed lakeside promenade lined with flowers and statues. Chillon Castle, just a short walk away, looks like something out of a fairytale. The town is famous for its jazz festival in July, and nearby vineyards are perfect for a slow afternoon.",
    highlights: ["Chillon Castle", "Lakeside promenade", "Lavaux vineyards nearby"],
    info: ["Best time: May-Oct", "Jazz festival in July", "Budget: Medium-High"]
  }
];

const TYPE_LABELS = { mountain: "Mountain", lake: "Lake", city: "City" };
