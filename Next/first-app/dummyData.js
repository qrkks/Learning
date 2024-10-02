const dummyData = [
  {
    id: "e2",
    title: "Newton",
    description: "We know: Newton's law of motion",
    location: "New York",
    date: "2021-04-15",
    image: "/images/hivan-arvizu-soyhivan-MAnhvw0nDDY-unsplash.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Einstein",
    description: "Relativity revolutionized physics",
    location: "Princeton",
    date: "2021-05-16",
    image: "/images/kate-darmody-OLMqCWSy2Uw-unsplash.jpg",
    isFeatured: false,
  },
  {
    id: "e4",
    title: "Tesla",
    description: "Innovations in electricity and energy",
    location: "Colorado Springs",
    date: "2022-05-17",
    image: "/images/luca-bravo-XJXWbfSo2f0-unsplash.jpg",
    isFeatured: true,
  },
];
export function getFeaturedEvents() {
  return dummyData.filter((event) => event.isFeatured);
}
export function getAllEvents() {
  return dummyData;
}
export function getFilteredEvents(dateFilter) {
  const {year, month} = dateFilter;
  let filteredEvents = dummyData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}
export function getEventById(id) {
  return dummyData.find((event) => event.id === id);
}
export default dummyData;
