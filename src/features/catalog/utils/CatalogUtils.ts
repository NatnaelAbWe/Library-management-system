export function generateRandomGenres(): string[] {
  const choices = [
    "Non-Fiction",
    "Childrens",
    "Fantasy",
    "Fiction",
    "Biography",
    "Romance",
    "Science Fiction",
    "Young Adult",
  ];

  const chosen: string[] = [];

  // Use choices.length to ensure every genre has a chance to be picked
  while (chosen.length < 5) {
    const num = Math.floor(Math.random() * choices.length);
    if (!chosen.includes(choices[num])) {
      chosen.push(choices[num]);
    }
  }

  return chosen;
}
