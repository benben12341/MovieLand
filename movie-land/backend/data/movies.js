const { users } = require('./users');

const movies = [
  {
    id: 1,
    name: 'Fight-Club',
    image: '/uploads/1.jpg',
    genre: 'Action',
    summary:
      "Fight Club is a 1996 novel by Chuck Palahniuk. It follows the experiences of an unnamed protagonist struggling with insomnia. Inspired by his doctor's exasperated remark that insomnia is not suffering, the protagonist finds relief by impersonating a seriously ill person in several support groups.",
    rating: 10,
    director: 'Dror Mizrahi',
    writer: 'Assaf Mizrahi',
    reviewsAmount: 0,
    createdBy: users[2]._id,
  },
  {
    id: 2,
    name: 'Pretty-Woman',
    image: '/uploads/2.jpg',
    genre: 'Drama',
    summary:
      'Synopsis. A very successful, wealthy lawyer, Edward Lewis, hires a beautiful and unlikely prostitute, Vivian Ward (Julia Roberts), from Sunset Blvd to bring along to various business events. An attraction developes between the two, and Edward finds it harder and harder to let the infectious, kind-hearted Vivian go.',
    rating: 10,
    director: 'Garry Marshall',
    writer: 'Garry Marshall',
    reviewsAmount: 0,
    createdBy: users[2]._id,
  },
  {
    id: 3,
    name: 'Scent-of-a-Woman',
    image: '/uploads/3.jpg',
    genre: 'Drama',
    summary:
      'Scent of a Woman is a 1992 American drama film produced and directed by Martin Brest that tells the story of a preparatory school student who takes a job as an assistant to an irritable, blind, medically retired Army lieutenant colonel.',
    rating: 10,
    director: 'Martin Brest',
    writer: 'Martin Brest',
    reviewsAmount: 0,
    createdBy: users[2]._id,
  },
  {
    id: 4,
    name: 'Pulp-Fiction',
    image: '/uploads/4.jpg',
    genre: 'Action',
    summary:
      'Pulp Fiction is a 1994 neo-noir film about the lives of two mob hit men, a boxer, a crime boss and his wife, and a pair of diner bandits that intertwine in four tales of violence and redemption.',
    rating: 10,
    director: 'Quentin Tarantino',
    writer: 'Quentin Tarantino',
    reviewsAmount: 0,
    createdBy: users[1]._id,
  },
  {
    id: 5,
    name: 'Wanted',
    image: '/uploads/5.jpg',
    genre: 'Action',
    summary:
      'Its plot revolves around Wesley Gibson (McAvoy), a frustrated account manager who discovers that he is the son of a professional assassin and decides to join the Fraternity, a secret society of assassins of which his father was a member.',
    rating: 10,
    director: 'Timur Bekmambetov',
    writer: 'Timur Bekmambetov',
    reviewsAmount: 0,
    createdBy: users[1]._id,
  },
  {
    id: 6,
    name: 'Shutter-Island',
    image: '/uploads/6.jpg',
    genre: 'Mystery',
    summary:
      "Plot. In 1954, U.S. Marshal Edward 'Teddy' Daniels and his new partner Chuck Aule travel to Ashecliffe Hospital for the criminally insane on Shutter Island, Boston Harbor, to investigate the disappearance of Rachel Solando, a patient of the hospital who had previously drowned her three children.",
    rating: 10,
    director: 'Martin Scorsese',
    writer: 'Martin Scorsese',
    reviewsAmount: 0,
    createdBy: users[1]._id,
  },
  {
    id: 7,
    name: 'Notting-Hill',
    image: '/uploads/7.jpg',
    genre: 'Comedy',
    summary:
      "The story is of a romance between a British bookseller (Grant) and a famous American actress (Roberts) who happens to walk into his shop in London's Notting Hill district. Released on 21 May 1999, Notting Hill was well received by critics and became the highest-grossing British film of all time.",
    rating: 10,
    director: 'Roger Michell',
    writer: 'Richard Curtis',
    reviewsAmount: 0,
    createdBy: users[2]._id,
  },
];

module.exports = { movies };
