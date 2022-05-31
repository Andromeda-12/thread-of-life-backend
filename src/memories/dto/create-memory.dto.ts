export class CreateMemoryDto {
  readonly title: string;
  readonly imageUrl: string;
  readonly content: string;
  readonly date: string;
  // readonly description: string;
  readonly userId: number;
}

// {
//   imageUrl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
//   title: 'Top western road trips ',
//   description:
//     'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio in quisquam vel beatae optio nihil.',
//     content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio in quisquam vel beatae optio nihil.',
//     userId: 0,
// },
