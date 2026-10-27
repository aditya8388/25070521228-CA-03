const sampleQuizzes = [
  {
    title: 'JavaScript & Web Fundamentals',
    description: 'Test your understanding of modern JavaScript, scopes, ES6 features, and asynchronous programming.',
    category: 'Programming',
    difficulty: 'Easy',
    timeLimit: 5,
    questions: [
      {
        questionText: 'Which keyword in JavaScript declares a block-scoped variable that can be reassigned?',
        options: ['var', 'let', 'const', 'def'],
        correctOption: 1,
        explanation: 'The let keyword declares a block-scoped variable that can be updated, unlike const which cannot be reassigned.'
      },
      {
        questionText: 'What is the output of `typeof null` in standard JavaScript?',
        options: ['null', 'undefined', 'object', 'number'],
        correctOption: 2,
        explanation: 'Due to a legacy bug preserved for backward compatibility, typeof null evaluates to "object".'
      },
      {
        questionText: 'Which method converts a JavaScript object into a JSON string?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.objectify()', 'Object.toJSON()'],
        correctOption: 1,
        explanation: 'JSON.stringify() serializes a JavaScript object into a valid JSON string.'
      },
      {
        questionText: 'What does the Promise.all() method do?',
        options: [
          'Resolves when any single promise resolves',
          'Resolves only after all input promises have resolved',
          'Cancels all promises if any is delayed',
          'Runs all promises synchronously one by one'
        ],
        correctOption: 1,
        explanation: 'Promise.all() waits for all promises in the array to resolve, or rejects immediately if any fails.'
      },
      {
        questionText: 'Which operator is used for strict equality comparison without type coercion?',
        options: ['==', '===', '=', '!='],
        correctOption: 1,
        explanation: 'The strict equality operator (===) checks both value and type without performing implicit coercion.'
      }
    ]
  },
  {
    title: 'Data Structures & Algorithms Basics',
    description: 'Core questions on arrays, stacks, queues, trees, and time complexity for CSE 2nd-year students.',
    category: 'Computer Science',
    difficulty: 'Medium',
    timeLimit: 6,
    questions: [
      {
        questionText: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctOption: 2,
        explanation: 'In a balanced BST with n nodes, search takes O(log n) time because the search space halves at each step.'
      },
      {
        questionText: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Array'],
        correctOption: 1,
        explanation: 'A Stack strictly follows the LIFO order where the most recently inserted item is the first to be popped.'
      },
      {
        questionText: 'Which sorting algorithm has a worst-case time complexity of O(n log n)?',
        options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'],
        correctOption: 3,
        explanation: 'Merge Sort consistently divides the array and merges in O(n log n) even in the worst case, unlike Quick Sort which can degrade to O(n²).'
      },
      {
        questionText: 'In a circular queue implemented using an array of size N, what condition indicates the queue is full?',
        options: [
          '(rear + 1) % N == front',
          'front == rear',
          'rear == N - 1',
          'front == -1 && rear == -1'
        ],
        correctOption: 0,
        explanation: 'In a circular queue of size N, when (rear + 1) % N equals front, the next slot is occupied by front, indicating full status.'
      },
      {
        questionText: 'Which algorithm design paradigm does Dijkstra’s Single Source Shortest Path algorithm follow?',
        options: ['Dynamic Programming', 'Greedy Approach', 'Backtracking', 'Divide and Conquer'],
        correctOption: 1,
        explanation: 'Dijkstra’s algorithm greedily chooses the unvisited vertex with the minimum tentative distance at each step.'
      }
    ]
  },
  {
    title: 'Quantitative & Logical Aptitude',
    description: 'Sharpen your analytical problem-solving skills with campus placement style aptitude questions.',
    category: 'Aptitude',
    difficulty: 'Medium',
    timeLimit: 5,
    questions: [
      {
        questionText: 'A train 150 meters long passes an electric pole in 15 seconds. What is the speed of the train in km/h?',
        options: ['30 km/h', '36 km/h', '45 km/h', '54 km/h'],
        correctOption: 1,
        explanation: 'Speed = Distance / Time = 150m / 15s = 10 m/s. Converting to km/h: 10 * (18/5) = 36 km/h.'
      },
      {
        questionText: 'If 12 men can complete a software module in 20 days, how many days will 15 men take to complete the same work?',
        options: ['14 days', '16 days', '18 days', '25 days'],
        correctOption: 1,
        explanation: 'Total man-days = 12 * 20 = 240. Days needed for 15 men = 240 / 15 = 16 days.'
      },
      {
        questionText: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
        options: ['125', '127', '129', '131'],
        correctOption: 1,
        explanation: 'Each term is double the previous plus 1: (63 * 2) + 1 = 127, or 2^(n+1) - 1.'
      },
      {
        questionText: 'A shopkeeper sells a book for $480 making a 20% profit. What was the original cost price?',
        options: ['$380', '$400', '$420', '$440'],
        correctOption: 1,
        explanation: 'Selling Price = Cost Price * 1.20 => Cost Price = 480 / 1.20 = $400.'
      },
      {
        questionText: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather’s only son." Who is the girl to Rohit?',
        options: ['Sister', 'Mother', 'Aunt', 'Cousin'],
        correctOption: 0,
        explanation: 'Grandfather’s only son is Rohit’s father. The daughter of Rohit’s father is Rohit’s sister.'
      }
    ]
  },
  {
    title: 'Tech & Science Trivia',
    description: 'Explore fascinating facts about computer history, major tech breakthroughs, and foundational science.',
    category: 'General Knowledge',
    difficulty: 'Easy',
    timeLimit: 4,
    questions: [
      {
        questionText: 'Who is widely recognized as the world’s first computer programmer?',
        options: ['Alan Turing', 'Ada Lovelace', 'Grace Hopper', 'Charles Babbage'],
        correctOption: 1,
        explanation: 'Ada Lovelace wrote the first published algorithm intended for Charles Babbage’s mechanical Analytical Engine in the 1840s.'
      },
      {
        questionText: 'What does the abbreviation "HTTP" stand for in web technology?',
        options: [
          'HyperText Transfer Protocol',
          'High Transfer Text Process',
          'Hyperlink Transmission Type Protocol',
          'Home Terminal Telecommunication Program'
        ],
        correctOption: 0,
        explanation: 'HTTP stands for HyperText Transfer Protocol, the foundational protocol for data communication on the World Wide Web.'
      },
      {
        questionText: 'In which decade was the Linux operating system kernel first released by Linus Torvalds?',
        options: ['1970s', '1980s', '1990s', '2000s'],
        correctOption: 2,
        explanation: 'Linus Torvalds published the first version of the Linux kernel (0.01) in September 1991.'
      },
      {
        questionText: 'What is the full form of SQL in database management systems?',
        options: [
          'Structured Query Language',
          'Standard Quantitative Logic',
          'Sequential Query Listing',
          'System Quick Link'
        ],
        correctOption: 0,
        explanation: 'SQL stands for Structured Query Language, the standardized domain-specific language for managing relational databases.'
      },
      {
        questionText: 'Which company developed the JavaScript programming language in 1995?',
        options: ['Microsoft', 'Netscape Communications', 'Sun Microsystems', 'Bell Labs'],
        correctOption: 1,
        explanation: 'Brendan Eich created JavaScript at Netscape Communications in 1995 in just 10 days.'
      }
    ]
  }
];

module.exports = sampleQuizzes;
