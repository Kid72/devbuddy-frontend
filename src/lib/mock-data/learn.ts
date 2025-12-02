export interface Language {
  id: string
  name: string
  slug: string
  icon: string // emoji or icon name
  description: string
  color: string // for theming
}

export interface Category {
  id: string
  languageSlug: string
  name: string
  slug: string
  description: string
  order: number
  topicCount?: number
}

export interface Topic {
  id: string
  categorySlug: string
  languageSlug: string
  title: string
  slug: string
  content: string // Markdown format
  order: number
  readTime: number // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const mockLanguages: Language[] = [
  {
    id: '1',
    name: 'Java',
    slug: 'java',
    icon: '☕',
    description: 'Enterprise-grade programming language',
    color: '#007396',
  },
  {
    id: '2',
    name: 'Go',
    slug: 'go',
    icon: '🐹',
    description: 'Simple, fast, and reliable',
    color: '#00ADD8',
  },
  {
    id: '3',
    name: 'Python',
    slug: 'python',
    icon: '🐍',
    description: 'Versatile and beginner-friendly',
    color: '#3776AB',
  },
  {
    id: '4',
    name: 'JavaScript',
    slug: 'javascript',
    icon: '🟨',
    description: 'The language of the web',
    color: '#F7DF1E',
  },
  {
    id: '5',
    name: 'React',
    slug: 'react',
    icon: '⚛️',
    description: 'Build modern user interfaces',
    color: '#61DAFB',
  },
  {
    id: '6',
    name: 'TypeScript',
    slug: 'typescript',
    icon: '🔷',
    description: 'JavaScript with type safety',
    color: '#3178C6',
  },
]

export const mockCategories: Category[] = [
  // Java Categories
  {
    id: '1',
    languageSlug: 'java',
    name: 'Collections Framework',
    slug: 'collections',
    description: 'Master Lists, Sets, Maps, and their implementations',
    order: 1,
    topicCount: 24,
  },
  {
    id: '2',
    languageSlug: 'java',
    name: 'Concurrency & Multithreading',
    slug: 'concurrency',
    description: 'Threads, Executors, CompletableFuture, and Virtual Threads',
    order: 2,
    topicCount: 18,
  },
  {
    id: '3',
    languageSlug: 'java',
    name: 'Spring Framework',
    slug: 'spring',
    description: 'Spring Boot, Spring MVC, Spring Data, and Spring Security',
    order: 3,
    topicCount: 32,
  },
  {
    id: '4',
    languageSlug: 'java',
    name: 'Java Streams API',
    slug: 'streams',
    description: 'Functional programming with Streams, Lambdas, and Optional',
    order: 4,
    topicCount: 15,
  },
  {
    id: '5',
    languageSlug: 'java',
    name: 'JPA & Hibernate',
    slug: 'jpa-hibernate',
    description: 'Object-relational mapping and database operations',
    order: 5,
    topicCount: 20,
  },
  {
    id: '6',
    languageSlug: 'java',
    name: 'Design Patterns',
    slug: 'design-patterns',
    description: 'Creational, Structural, and Behavioral patterns in Java',
    order: 6,
    topicCount: 23,
  },

  // Go Categories
  {
    id: '7',
    languageSlug: 'go',
    name: 'Goroutines & Channels',
    slug: 'concurrency',
    description: 'Master Go\'s concurrency primitives and patterns',
    order: 1,
    topicCount: 16,
  },
  {
    id: '8',
    languageSlug: 'go',
    name: 'Web Development',
    slug: 'web',
    description: 'HTTP servers, routing, middleware, and REST APIs',
    order: 2,
    topicCount: 22,
  },
  {
    id: '9',
    languageSlug: 'go',
    name: 'Testing & Debugging',
    slug: 'testing',
    description: 'Unit tests, table-driven tests, benchmarks, and profiling',
    order: 3,
    topicCount: 14,
  },
  {
    id: '10',
    languageSlug: 'go',
    name: 'Error Handling',
    slug: 'errors',
    description: 'Best practices for error handling and custom errors',
    order: 4,
    topicCount: 10,
  },
  {
    id: '11',
    languageSlug: 'go',
    name: 'Data Structures',
    slug: 'data-structures',
    description: 'Slices, maps, structs, and custom data types',
    order: 5,
    topicCount: 12,
  },

  // Python Categories
  {
    id: '12',
    languageSlug: 'python',
    name: 'Data Structures',
    slug: 'data-structures',
    description: 'Lists, dictionaries, sets, and tuples',
    order: 1,
    topicCount: 18,
  },
  {
    id: '13',
    languageSlug: 'python',
    name: 'Object-Oriented Programming',
    slug: 'oop',
    description: 'Classes, inheritance, polymorphism, and magic methods',
    order: 2,
    topicCount: 20,
  },
  {
    id: '14',
    languageSlug: 'python',
    name: 'Asynchronous Programming',
    slug: 'async',
    description: 'async/await, asyncio, and concurrent programming',
    order: 3,
    topicCount: 15,
  },
  {
    id: '15',
    languageSlug: 'python',
    name: 'Web Frameworks',
    slug: 'web-frameworks',
    description: 'Django, Flask, FastAPI, and web development',
    order: 4,
    topicCount: 28,
  },

  // JavaScript Categories
  {
    id: '16',
    languageSlug: 'javascript',
    name: 'Modern JavaScript (ES6+)',
    slug: 'modern-js',
    description: 'Arrow functions, destructuring, promises, and async/await',
    order: 1,
    topicCount: 25,
  },
  {
    id: '17',
    languageSlug: 'javascript',
    name: 'DOM Manipulation',
    slug: 'dom',
    description: 'Working with the Document Object Model',
    order: 2,
    topicCount: 16,
  },
  {
    id: '18',
    languageSlug: 'javascript',
    name: 'Asynchronous JavaScript',
    slug: 'async',
    description: 'Callbacks, promises, async/await, and event loop',
    order: 3,
    topicCount: 14,
  },
  {
    id: '19',
    languageSlug: 'javascript',
    name: 'Array & Object Methods',
    slug: 'methods',
    description: 'Map, filter, reduce, and essential array/object operations',
    order: 4,
    topicCount: 20,
  },

  // React Categories
  {
    id: '20',
    languageSlug: 'react',
    name: 'React Fundamentals',
    slug: 'fundamentals',
    description: 'Components, props, state, and JSX',
    order: 1,
    topicCount: 22,
  },
  {
    id: '21',
    languageSlug: 'react',
    name: 'React Hooks',
    slug: 'hooks',
    description: 'useState, useEffect, useContext, and custom hooks',
    order: 2,
    topicCount: 18,
  },
  {
    id: '22',
    languageSlug: 'react',
    name: 'State Management',
    slug: 'state-management',
    description: 'Context API, Redux, Zustand, and state patterns',
    order: 3,
    topicCount: 16,
  },
  {
    id: '23',
    languageSlug: 'react',
    name: 'React Router',
    slug: 'routing',
    description: 'Navigation, routes, and dynamic routing in React apps',
    order: 4,
    topicCount: 12,
  },

  // TypeScript Categories
  {
    id: '24',
    languageSlug: 'typescript',
    name: 'Type System Basics',
    slug: 'basics',
    description: 'Primitive types, arrays, tuples, and type annotations',
    order: 1,
    topicCount: 20,
  },
  {
    id: '25',
    languageSlug: 'typescript',
    name: 'Advanced Types',
    slug: 'advanced-types',
    description: 'Generics, utility types, conditional types, and mapped types',
    order: 2,
    topicCount: 24,
  },
  {
    id: '26',
    languageSlug: 'typescript',
    name: 'TypeScript with React',
    slug: 'react',
    description: 'Typing components, props, hooks, and events',
    order: 3,
    topicCount: 16,
  },
  {
    id: '27',
    languageSlug: 'typescript',
    name: 'Type Guards & Narrowing',
    slug: 'type-guards',
    description: 'Type predicates, narrowing, and discriminated unions',
    order: 4,
    topicCount: 14,
  },
]

export const mockTopics: Topic[] = [
  // Java Collections Topics
  {
    id: '1',
    categorySlug: 'collections',
    languageSlug: 'java',
    title: 'Introduction to Collections Framework',
    slug: 'introduction',
    content: `# Introduction to Java Collections Framework

The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes interfaces, implementations, and algorithms to help you work with data structures efficiently.

## Core Interfaces

### List Interface
An ordered collection (also known as a sequence) that allows duplicate elements.

\`\`\`java
// ArrayList - backed by a dynamic array
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

// Access by index
String first = names.get(0); // "Alice"

// Iterate
for (String name : names) {
    System.out.println(name);
}
\`\`\`

### Set Interface
A collection that contains no duplicate elements.

\`\`\`java
// HashSet - fastest, no ordering
Set<Integer> numbers = new HashSet<>();
numbers.add(1);
numbers.add(2);
numbers.add(1); // Won't be added (duplicate)

System.out.println(numbers.size()); // 2

// LinkedHashSet - maintains insertion order
Set<String> orderedSet = new LinkedHashSet<>();
orderedSet.add("first");
orderedSet.add("second");
\`\`\`

### Map Interface
An object that maps keys to values, with no duplicate keys allowed.

\`\`\`java
// HashMap - fastest, no ordering
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.put("Bob", 30);

// Get value
int aliceAge = ages.get("Alice"); // 25

// Check if key exists
boolean hasBob = ages.containsKey("Bob"); // true

// Iterate over entries
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\`

## When to Use What

- **ArrayList**: When you need fast random access and don't insert/delete from the middle often
- **LinkedList**: When you frequently add/remove from the beginning/end
- **HashSet**: When you need unique elements and don't care about order
- **LinkedHashSet**: When you need unique elements with insertion order
- **TreeSet**: When you need unique elements in sorted order
- **HashMap**: When you need fast key-value lookups
- **TreeMap**: When you need key-value pairs sorted by key

## Common Operations Time Complexity

| Operation | ArrayList | LinkedList | HashSet | HashMap |
|-----------|-----------|------------|---------|---------|
| Add | O(1)* | O(1) | O(1) | O(1) |
| Remove | O(n) | O(1)** | O(1) | O(1) |
| Get | O(1) | O(n) | N/A | O(1) |
| Contains | O(n) | O(n) | O(1) | O(1) |

*Amortized, **At known position

## Best Practices

1. **Program to interfaces, not implementations**
   \`\`\`java
   // Good
   List<String> list = new ArrayList<>();

   // Avoid
   ArrayList<String> list = new ArrayList<>();
   \`\`\`

2. **Specify initial capacity for large collections**
   \`\`\`java
   // Prevents multiple resizing operations
   List<String> bigList = new ArrayList<>(10000);
   \`\`\`

3. **Use the right collection for your use case**
   - Need uniqueness? Use Set
   - Need key-value pairs? Use Map
   - Need ordering? Consider LinkedHashSet or TreeSet
`,
    order: 1,
    readTime: 8,
    difficulty: 'beginner',
  },
  {
    id: '2',
    categorySlug: 'collections',
    languageSlug: 'java',
    title: 'HashMap Deep Dive',
    slug: 'hashmap-deep-dive',
    content: `# HashMap Deep Dive

HashMap is one of the most commonly used data structures in Java. Understanding how it works internally helps you write better code and avoid common pitfalls.

## How HashMap Works Internally

HashMap uses an array of "buckets" where each bucket can store multiple entries. When you put a key-value pair:

1. The key's \`hashCode()\` is calculated
2. The hash is used to determine which bucket (array index) to use
3. The key-value pair is stored in that bucket

\`\`\`java
// Creating a HashMap
Map<String, Integer> scores = new HashMap<>();

// Adding elements
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.put("Charlie", 92);

// Getting elements
int aliceScore = scores.get("Alice"); // 95

// Updating values
scores.put("Alice", 98); // Updates existing value

// Checking existence
boolean hasAlice = scores.containsKey("Alice"); // true
boolean hasScoreOf100 = scores.containsValue(100); // false

// Removing
scores.remove("Bob");
\`\`\`

## Hash Collisions

When two keys produce the same hash code, it's called a collision. HashMap handles this by storing multiple entries in the same bucket using a linked list (Java 7) or a balanced tree (Java 8+ when bucket size exceeds threshold).

\`\`\`java
// Example of potential collision
class Person {
    String name;

    @Override
    public int hashCode() {
        return name.length(); // Bad hash function!
        // "Alice" and "Carol" both return 5
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Person)) return false;
        return this.name.equals(((Person) obj).name);
    }
}
\`\`\`

## Time Complexity

- **Get**: O(1) average case, O(n) worst case (if all keys hash to same bucket)
- **Put**: O(1) average case, O(n) worst case
- **Remove**: O(1) average case, O(n) worst case
- **ContainsKey**: O(1) average case, O(n) worst case

## Load Factor and Capacity

\`\`\`java
// Default: capacity=16, loadFactor=0.75
Map<String, Integer> map1 = new HashMap<>();

// Custom capacity and load factor
Map<String, Integer> map2 = new HashMap<>(32, 0.8f);
\`\`\`

- **Capacity**: Number of buckets in the hash table
- **Load Factor**: Measure of how full the hash table can get before resizing
- When size > capacity * loadFactor, HashMap is resized (doubled)

## Common Pitfalls

### 1. Not Overriding hashCode() and equals()

\`\`\`java
// BAD: Using mutable object as key without proper hashCode/equals
class BadKey {
    String data;
    // No hashCode() or equals() override
}

Map<BadKey, String> map = new HashMap<>();
BadKey key = new BadKey();
key.data = "test";
map.put(key, "value");

key.data = "changed"; // Key is now effectively lost!
String value = map.get(key); // Might not find it
\`\`\`

### 2. Using Mutable Objects as Keys

\`\`\`java
// GOOD: Using immutable String as key
Map<String, Integer> goodMap = new HashMap<>();
goodMap.put("immutable", 1); // Safe

// BAD: Using mutable object
Map<List<String>, Integer> badMap = new HashMap<>();
List<String> key = new ArrayList<>();
key.add("item");
badMap.put(key, 1);
key.add("another"); // Hash code changed! Entry is lost
\`\`\`

### 3. Concurrent Modification

\`\`\`java
// BAD: Modifying map while iterating
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);

for (String key : map.keySet()) {
    map.remove(key); // ConcurrentModificationException!
}

// GOOD: Use Iterator.remove()
Iterator<String> it = map.keySet().iterator();
while (it.hasNext()) {
    String key = it.next();
    it.remove(); // Safe
}
\`\`\`

## HashMap vs ConcurrentHashMap

Use **ConcurrentHashMap** instead of HashMap when:
- Multiple threads access the map
- At least one thread modifies it
- You need thread safety without external synchronization

\`\`\`java
// Thread-safe alternative
Map<String, Integer> threadSafeMap = new ConcurrentHashMap<>();
\`\`\`

## Performance Tips

1. **Set initial capacity** if you know the size
   \`\`\`java
   Map<String, Integer> map = new HashMap<>(1000);
   \`\`\`

2. **Use good hash functions** that distribute keys evenly
3. **Consider memory usage** - HashMap uses more memory than ArrayList
4. **Use computeIfAbsent** for lazy initialization
   \`\`\`java
   map.computeIfAbsent("key", k -> expensiveComputation());
   \`\`\`
`,
    order: 2,
    readTime: 12,
    difficulty: 'intermediate',
  },
  {
    id: '3',
    categorySlug: 'collections',
    languageSlug: 'java',
    title: 'ArrayList vs LinkedList: When to Use Which',
    slug: 'arraylist-vs-linkedlist',
    content: `# ArrayList vs LinkedList: When to Use Which

Both ArrayList and LinkedList implement the List interface, but they have very different internal structures and performance characteristics.

## Internal Structure

### ArrayList
Backed by a dynamic array that grows as needed.

\`\`\`java
// ArrayList internal structure (simplified)
class ArrayList<E> {
    private Object[] elements;
    private int size;

    // When array is full, create new array (usually 1.5x or 2x size)
    // and copy all elements
}
\`\`\`

### LinkedList
Implemented as a doubly-linked list where each element points to next and previous.

\`\`\`java
// LinkedList internal structure (simplified)
class LinkedList<E> {
    private Node<E> first;
    private Node<E> last;

    private static class Node<E> {
        E data;
        Node<E> next;
        Node<E> prev;
    }
}
\`\`\`

## Performance Comparison

| Operation | ArrayList | LinkedList | Winner |
|-----------|-----------|------------|--------|
| get(index) | O(1) | O(n) | ArrayList |
| add(element) | O(1)* | O(1) | Tie |
| add(index, element) | O(n) | O(n)** | Tie |
| remove(index) | O(n) | O(n)** | Tie |
| contains(element) | O(n) | O(n) | Tie |
| iterator.remove() | O(n) | O(1) | LinkedList |

*Amortized - may need to resize array
**O(1) if at beginning/end, O(n) if in middle

## Code Examples

### ArrayList is Better For

**Random Access:**
\`\`\`java
List<String> array = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

// Fast random access - O(1)
String third = array.get(2); // "C"
String last = array.get(array.size() - 1); // "E"
\`\`\`

**Iteration:**
\`\`\`java
// Faster iteration due to CPU cache locality
for (int i = 0; i < array.size(); i++) {
    String item = array.get(i);
    process(item);
}
\`\`\`

**Adding to the End:**
\`\`\`java
List<Integer> numbers = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    numbers.add(i); // Fast - O(1) amortized
}
\`\`\`

### LinkedList is Better For

**Adding/Removing at Beginning:**
\`\`\`java
List<String> linked = new LinkedList<>();

// Fast insertion at beginning - O(1)
linked.add(0, "First");
linked.add(0, "New First"); // ArrayList would be O(n)
\`\`\`

**Queue/Deque Operations:**
\`\`\`java
Deque<Task> taskQueue = new LinkedList<>();

// Fast operations at both ends
taskQueue.addFirst(urgentTask);   // O(1)
taskQueue.addLast(normalTask);    // O(1)
Task next = taskQueue.removeFirst(); // O(1)
\`\`\`

**Frequent Iterator Removals:**
\`\`\`java
List<String> list = new LinkedList<>(Arrays.asList("A", "B", "C", "D"));

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (shouldRemove(item)) {
        it.remove(); // O(1) for LinkedList, O(n) for ArrayList
    }
}
\`\`\`

## Real-World Scenarios

### Use ArrayList When:
- You mainly access elements by index
- You iterate through the list frequently
- You mostly add elements to the end
- Memory efficiency matters (ArrayList uses less memory per element)
- You're storing a small to medium number of elements

### Use LinkedList When:
- You frequently add/remove from the beginning
- You're implementing a queue or deque
- You frequently add/remove elements while iterating
- You don't need random access
- You're willing to trade memory for operation speed on specific operations

## Memory Considerations

\`\`\`java
// ArrayList: stores only data + array overhead
ArrayList<Integer> arrayList = new ArrayList<>();
// Memory per element: ~4 bytes (Integer reference)

// LinkedList: stores data + two pointers per element
LinkedList<Integer> linkedList = new LinkedList<>();
// Memory per element: ~24 bytes (data + next + prev + node overhead)
\`\`\`

LinkedList uses approximately **6x more memory** per element!

## Best Practices

1. **Default to ArrayList** unless you have a specific reason to use LinkedList
2. **Use ArrayDeque** instead of LinkedList for queue/stack operations
   \`\`\`java
   // Better than LinkedList for queue operations
   Deque<String> queue = new ArrayDeque<>();
   \`\`\`

3. **Specify initial capacity** for ArrayList if you know the size
   \`\`\`java
   List<String> list = new ArrayList<>(10000);
   \`\`\`

4. **Avoid get(index) in loops with LinkedList**
   \`\`\`java
   // BAD for LinkedList - O(n²)
   for (int i = 0; i < list.size(); i++) {
       String item = list.get(i);
   }

   // GOOD for any List - O(n)
   for (String item : list) {
       // process item
   }
   \`\`\`

## Conclusion

**In 95% of cases, use ArrayList.** It's faster for most operations, uses less memory, and has better cache locality. Only use LinkedList when you specifically need its characteristics (frequent insertions/deletions at both ends, implementing queues).
`,
    order: 3,
    readTime: 10,
    difficulty: 'intermediate',
  },
  {
    id: '4',
    categorySlug: 'collections',
    languageSlug: 'java',
    title: 'TreeMap and Sorted Collections',
    slug: 'treemap-sorted-collections',
    content: `# TreeMap and Sorted Collections

TreeMap is a Red-Black tree based NavigableMap implementation that keeps its entries sorted according to the natural ordering of keys or by a provided Comparator.

## TreeMap Basics

\`\`\`java
// Natural ordering (alphabetical for Strings)
Map<String, Integer> scores = new TreeMap<>();
scores.put("Charlie", 85);
scores.put("Alice", 95);
scores.put("Bob", 90);

// Iteration is in sorted order
for (String name : scores.keySet()) {
    System.out.println(name); // Alice, Bob, Charlie
}
\`\`\`

## Custom Sorting with Comparator

\`\`\`java
// Sort by descending order
Map<String, Integer> reversed = new TreeMap<>(Comparator.reverseOrder());
reversed.put("Alice", 95);
reversed.put("Bob", 90);
reversed.put("Charlie", 85);

// Prints: Charlie, Bob, Alice
for (String name : reversed.keySet()) {
    System.out.println(name);
}

// Sort by string length
Map<String, Integer> byLength = new TreeMap<>(
    Comparator.comparingInt(String::length)
);
byLength.put("Al", 1);
byLength.put("Bob", 2);
byLength.put("Charlie", 3);
\`\`\`

## NavigableMap Operations

TreeMap implements NavigableMap, providing powerful navigation methods:

\`\`\`java
TreeMap<Integer, String> ages = new TreeMap<>();
ages.put(25, "Alice");
ages.put(30, "Bob");
ages.put(35, "Charlie");
ages.put(40, "Dave");

// Get first and last
Map.Entry<Integer, String> youngest = ages.firstEntry(); // 25=Alice
Map.Entry<Integer, String> oldest = ages.lastEntry();     // 40=Dave

// Get entries less than a value
Map.Entry<Integer, String> under35 = ages.lowerEntry(35);  // 30=Bob
Map.Entry<Integer, String> at35orUnder = ages.floorEntry(35); // 35=Charlie

// Get entries greater than a value
Map.Entry<Integer, String> over30 = ages.higherEntry(30);  // 35=Charlie
Map.Entry<Integer, String> at30orOver = ages.ceilingEntry(30); // 30=Bob

// Get submap
SortedMap<Integer, String> thirties = ages.subMap(30, 40); // 30, 35
\`\`\`

## TreeSet: Sorted Set

\`\`\`java
// Natural ordering
Set<String> names = new TreeSet<>();
names.add("Charlie");
names.add("Alice");
names.add("Bob");

System.out.println(names); // [Alice, Bob, Charlie]

// Custom comparator - by length, then alphabetically
Set<String> byLength = new TreeSet<>(
    Comparator.comparingInt(String::length)
              .thenComparing(Comparator.naturalOrder())
);
byLength.add("Alice");
byLength.add("Bob");
byLength.add("Al");
byLength.add("Charlie");

System.out.println(byLength); // [Al, Bob, Alice, Charlie]
\`\`\`

## Performance Characteristics

| Operation | TreeMap | HashMap | When to Use TreeMap |
|-----------|---------|---------|-------------------|
| Get | O(log n) | O(1) | Need sorted order |
| Put | O(log n) | O(1) | Need sorted order |
| Remove | O(log n) | O(1) | Need sorted order |
| Navigation | O(log n) | N/A | Need range queries |

## Real-World Use Cases

### 1. Leaderboard
\`\`\`java
// Sort by score (descending)
TreeMap<Integer, String> leaderboard = new TreeMap<>(Comparator.reverseOrder());
leaderboard.put(95, "Alice");
leaderboard.put(90, "Bob");
leaderboard.put(85, "Charlie");

// Get top 3
int count = 0;
for (Map.Entry<Integer, String> entry : leaderboard.entrySet()) {
    if (count++ >= 3) break;
    System.out.println(entry.getValue() + ": " + entry.getKey());
}
\`\`\`

### 2. Event Scheduling
\`\`\`java
// Events sorted by time
TreeMap<LocalDateTime, String> schedule = new TreeMap<>();
schedule.put(LocalDateTime.of(2025, 1, 15, 9, 0), "Meeting");
schedule.put(LocalDateTime.of(2025, 1, 15, 14, 0), "Presentation");
schedule.put(LocalDateTime.of(2025, 1, 15, 11, 0), "Lunch");

// Get next event after current time
LocalDateTime now = LocalDateTime.now();
Map.Entry<LocalDateTime, String> nextEvent = schedule.ceilingEntry(now);
\`\`\`

### 3. Range Queries
\`\`\`java
// Price ranges
TreeMap<Double, Product> priceMap = new TreeMap<>();
priceMap.put(9.99, new Product("Book"));
priceMap.put(19.99, new Product("Shirt"));
priceMap.put(49.99, new Product("Shoes"));

// Get products between $10 and $50
NavigableMap<Double, Product> range = priceMap.subMap(10.0, true, 50.0, false);
\`\`\`

## Important Considerations

1. **Keys Must Be Comparable**
   \`\`\`java
   // This will throw ClassCastException if Person doesn't implement Comparable
   TreeMap<Person, String> map = new TreeMap<>();

   // Solution: Provide Comparator
   TreeMap<Person, String> map = new TreeMap<>(
       Comparator.comparing(Person::getAge)
   );
   \`\`\`

2. **Null Keys Not Allowed**
   \`\`\`java
   TreeMap<String, Integer> map = new TreeMap<>();
   map.put(null, 1); // NullPointerException!
   \`\`\`

3. **Consistent with equals()**
   The comparator must be consistent with equals, or the map may behave incorrectly.

## Best Practices

- Use TreeMap when you need sorted keys
- Use HashMap for better performance when sorting isn't needed
- Provide Comparator instead of relying on natural ordering when possible
- Consider LinkedHashMap if you just need insertion order
`,
    order: 4,
    readTime: 9,
    difficulty: 'intermediate',
  },
  {
    id: '5',
    categorySlug: 'collections',
    languageSlug: 'java',
    title: 'Java Collections Best Practices',
    slug: 'best-practices',
    content: `# Java Collections Best Practices

Master these best practices to write clean, efficient, and maintainable code with Java Collections.

## 1. Program to Interfaces

Always declare collections using interface types, not implementation types.

\`\`\`java
// GOOD
List<String> names = new ArrayList<>();
Set<Integer> numbers = new HashSet<>();
Map<String, Integer> scores = new HashMap<>();

// BAD
ArrayList<String> names = new ArrayList<>();
HashSet<Integer> numbers = new HashSet<>();
HashMap<String, Integer> scores = new HashMap<>();
\`\`\`

**Why?** Flexibility to change implementation without affecting client code.

## 2. Specify Initial Capacity

When you know the approximate size, specify initial capacity to avoid resizing.

\`\`\`java
// Processing 10,000 items
List<String> largeList = new ArrayList<>(10000);
Set<String> largeSet = new HashSet<>(10000);
Map<String, Integer> largeMap = new HashMap<>(10000);

// Without capacity: multiple array copies during growth
// With capacity: single allocation
\`\`\`

## 3. Use Immutable Collections

Prefer immutable collections when data won't change.

\`\`\`java
// Java 9+ - compact and efficient
List<String> names = List.of("Alice", "Bob", "Charlie");
Set<Integer> numbers = Set.of(1, 2, 3);
Map<String, Integer> scores = Map.of(
    "Alice", 95,
    "Bob", 90
);

// Older Java - using Collections.unmodifiableList()
List<String> mutableList = new ArrayList<>();
mutableList.add("Alice");
List<String> immutableList = Collections.unmodifiableList(mutableList);
\`\`\`

## 4. Avoid Raw Types

Always specify generic types to catch errors at compile time.

\`\`\`java
// BAD - raw type
List list = new ArrayList();
list.add("string");
list.add(42); // No compile error, but dangerous!

// GOOD - parameterized type
List<String> list = new ArrayList<>();
list.add("string");
// list.add(42); // Compile error - type safe!
\`\`\`

## 5. Use Enhanced For Loop or Streams

\`\`\`java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// GOOD - enhanced for loop
for (String name : names) {
    System.out.println(name);
}

// BETTER - streams for complex operations
names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .forEach(System.out::println);

// BAD - manual indexing (unless you need the index)
for (int i = 0; i < names.size(); i++) {
    String name = names.get(i);
    System.out.println(name);
}
\`\`\`

## 6. Use computeIfAbsent for Lazy Initialization

\`\`\`java
Map<String, List<String>> groupedData = new HashMap<>();

// BAD - verbose
String key = "group1";
List<String> group = groupedData.get(key);
if (group == null) {
    group = new ArrayList<>();
    groupedData.put(key, group);
}
group.add("item");

// GOOD - concise and clear
groupedData.computeIfAbsent("group1", k -> new ArrayList<>()).add("item");
\`\`\`

## 7. Remove During Iteration Safely

\`\`\`java
List<String> names = new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie"));

// BAD - ConcurrentModificationException
for (String name : names) {
    if (name.startsWith("B")) {
        names.remove(name); // Throws exception!
    }
}

// GOOD - using iterator
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    if (name.startsWith("B")) {
        it.remove(); // Safe
    }
}

// BEST - using removeIf (Java 8+)
names.removeIf(name -> name.startsWith("B"));
\`\`\`

## 8. Choose the Right Collection

\`\`\`java
// Need unique elements? Use Set
Set<String> uniqueNames = new HashSet<>();

// Need key-value pairs? Use Map
Map<String, Integer> nameToAge = new HashMap<>();

// Need elements in sorted order? Use TreeSet or TreeMap
Set<Integer> sortedNumbers = new TreeSet<>();

// Need insertion order? Use LinkedHashSet or LinkedHashMap
Set<String> orderedSet = new LinkedHashSet<>();

// Need thread safety? Use concurrent collections
Map<String, Integer> threadSafeMap = new ConcurrentHashMap<>();
\`\`\`

## 9. Use Factory Methods for Small Collections

\`\`\`java
// Java 9+ factory methods
List<String> small = List.of("one", "two", "three");
Set<Integer> smallSet = Set.of(1, 2, 3);
Map<String, Integer> smallMap = Map.of("one", 1, "two", 2);

// More efficient than:
List<String> small = new ArrayList<>();
small.add("one");
small.add("two");
small.add("three");
\`\`\`

## 10. Consider Memory and Performance Trade-offs

\`\`\`java
// HashMap: faster, uses more memory
Map<String, Integer> fast = new HashMap<>();

// TreeMap: slower, sorted, uses more memory
Map<String, Integer> sorted = new TreeMap<>();

// ArrayList: fast access, slow insertion in middle
List<String> fastAccess = new ArrayList<>();

// LinkedList: slow access, fast insertion at ends
List<String> fastInsertion = new LinkedList<>();
\`\`\`

## 11. Use Bulk Operations

\`\`\`java
List<String> source = Arrays.asList("A", "B", "C");
List<String> dest = new ArrayList<>();

// GOOD - bulk operation
dest.addAll(source);

// BAD - element by element
for (String item : source) {
    dest.add(item);
}
\`\`\`

## 12. Null Safety

\`\`\`java
// Use Optional to handle null
Map<String, String> map = new HashMap<>();

// Instead of:
String value = map.get("key");
if (value != null) {
    process(value);
}

// Use:
Optional.ofNullable(map.get("key"))
    .ifPresent(this::process);

// Or with getOrDefault:
String value = map.getOrDefault("key", "default");
\`\`\`

## Summary Checklist

✅ Declare collections using interface types
✅ Specify initial capacity for large collections
✅ Use immutable collections when possible
✅ Always use generic types
✅ Choose the right collection for your use case
✅ Use enhanced for loop or streams
✅ Remove safely during iteration
✅ Use computeIfAbsent for lazy initialization
✅ Prefer bulk operations
✅ Handle nulls properly

Following these practices will make your code more maintainable, performant, and less prone to bugs.
`,
    order: 5,
    readTime: 11,
    difficulty: 'beginner',
  },
]

// Helper function to get categories by language
export function getCategoriesByLanguage(languageSlug: string): Category[] {
  return mockCategories
    .filter(cat => cat.languageSlug === languageSlug)
    .sort((a, b) => a.order - b.order)
}

// Helper function to get language by slug
export function getLanguageBySlug(slug: string): Language | undefined {
  return mockLanguages.find(lang => lang.slug === slug)
}

// Helper function to get topics by category
export function getTopicsByCategory(languageSlug: string, categorySlug: string): Topic[] {
  return mockTopics
    .filter(topic => topic.languageSlug === languageSlug && topic.categorySlug === categorySlug)
    .sort((a, b) => a.order - b.order)
}

// Helper function to get topic by slug
export function getTopicBySlug(languageSlug: string, categorySlug: string, topicSlug: string): Topic | undefined {
  return mockTopics.find(
    topic =>
      topic.languageSlug === languageSlug &&
      topic.categorySlug === categorySlug &&
      topic.slug === topicSlug
  )
}

// Helper function to get category by slug
export function getCategoryBySlug(languageSlug: string, categorySlug: string): Category | undefined {
  return mockCategories.find(
    cat => cat.languageSlug === languageSlug && cat.slug === categorySlug
  )
}
