/**
 * Mock Interview Test Data
 * Comprehensive test fixtures for Playwright interview feature tests
 */

export interface InterviewQuestion {
  id: string
  title: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  video_url?: string
  created_at: string
  updated_at: string
}

export interface InterviewStats {
  total_questions: number
  by_category: Record<string, number> // Maps language slug to question count (e.g., { java: 20, go: 25 })
  languageBreakdown?: Array<{
    language: string
    count: number
    slug: string
  }>
}

export interface InterviewCategory {
  id: string
  name: string
  slug: string
  questionCount: number
  available: boolean
}

// ============================================================================
// JAVA QUESTIONS (20 questions)
// ============================================================================

export const javaQuestions: InterviewQuestion[] = [
  {
    id: 'java-1',
    title: 'What is the difference between JDK, JRE, and JVM?',
    question: 'Explain the relationship between JDK, JRE, and JVM in Java.',
    answer: `# JDK, JRE, and JVM

**JVM (Java Virtual Machine)**:
- Runtime environment that executes Java bytecode
- Platform-dependent implementation
- Provides memory management and garbage collection

**JRE (Java Runtime Environment)**:
- JVM + Standard libraries + Runtime components
- Needed to run Java applications
- Does not contain development tools

**JDK (Java Development Kit)**:
- JRE + Development tools (compiler, debugger)
- Needed to develop Java applications
- Contains javac, jar, javadoc, etc.

**Relationship**: JDK ⊃ JRE ⊃ JVM`,
    difficulty: 'easy',
    category: 'Core Java',
    tags: ['jvm', 'fundamentals', 'architecture'],
    video_url: 'https://www.youtube.com/watch?v=QMq1kWy56iU',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'java-2',
    title: 'Explain the concept of autoboxing and unboxing',
    question: 'What is autoboxing and unboxing in Java? Provide examples.',
    answer: `# Autoboxing and Unboxing

**Autoboxing**: Automatic conversion of primitive types to their wrapper classes.
**Unboxing**: Automatic conversion of wrapper classes to primitives.

\`\`\`java
// Autoboxing
Integer obj = 10; // int -> Integer

// Unboxing
int value = obj; // Integer -> int

// In collections
List<Integer> list = new ArrayList<>();
list.add(5); // Autoboxing
int num = list.get(0); // Unboxing
\`\`\`

**Performance Note**: Excessive autoboxing/unboxing can impact performance.`,
    difficulty: 'easy',
    category: 'Core Java',
    tags: ['primitives', 'wrappers', 'collections'],
    created_at: '2024-01-15T10:05:00Z',
    updated_at: '2024-01-15T10:05:00Z',
  },
  {
    id: 'java-3',
    title: 'What are the differences between String, StringBuilder, and StringBuffer?',
    question: 'Compare String, StringBuilder, and StringBuffer in Java.',
    answer: `# String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread Safety | N/A | Not thread-safe | Thread-safe |
| Performance | Slowest | Fastest | Slower than StringBuilder |
| Use Case | Few modifications | Single-threaded | Multi-threaded |

\`\`\`java
String str = "Hello"; // Immutable
str += " World"; // Creates new object

StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); // Modifies same object

StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World"); // Thread-safe modification
\`\`\``,
    difficulty: 'medium',
    category: 'Core Java',
    tags: ['strings', 'immutability', 'performance'],
    video_url: 'https://www.youtube.com/watch?v=BNDlQs1apqE',
    created_at: '2024-01-15T10:10:00Z',
    updated_at: '2024-01-15T10:10:00Z',
  },
  {
    id: 'java-4',
    title: 'Explain the equals() and hashCode() contract',
    question: 'What is the contract between equals() and hashCode() methods?',
    answer: `# equals() and hashCode() Contract

**Contract Rules**:
1. If \`a.equals(b)\` is true, then \`a.hashCode() == b.hashCode()\`
2. If \`a.hashCode() == b.hashCode()\`, \`a.equals(b)\` may or may not be true
3. If you override equals(), you MUST override hashCode()

\`\`\`java
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
               Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
\`\`\`

**Why Important**: Required for correct behavior in HashMap, HashSet, etc.`,
    difficulty: 'medium',
    category: 'Core Java',
    tags: ['equals', 'hashcode', 'collections'],
    created_at: '2024-01-15T10:15:00Z',
    updated_at: '2024-01-15T10:15:00Z',
  },
  {
    id: 'java-5',
    title: 'What is the difference between Comparable and Comparator?',
    question: 'Explain Comparable vs Comparator interfaces in Java.',
    answer: `# Comparable vs Comparator

**Comparable**:
- Natural ordering
- Implemented by the class itself
- Single sorting sequence
- \`compareTo(Object o)\` method

**Comparator**:
- Custom ordering
- External to the class
- Multiple sorting sequences
- \`compare(Object o1, Object o2)\` method

\`\`\`java
// Comparable
public class Student implements Comparable<Student> {
    private int id;

    @Override
    public int compareTo(Student other) {
        return this.id - other.id;
    }
}

// Comparator
Comparator<Student> nameComparator =
    Comparator.comparing(Student::getName);

Collections.sort(students, nameComparator);
\`\`\``,
    difficulty: 'medium',
    category: 'Core Java',
    tags: ['comparable', 'comparator', 'sorting'],
    created_at: '2024-01-15T10:20:00Z',
    updated_at: '2024-01-15T10:20:00Z',
  },
  {
    id: 'java-6',
    title: 'Explain the volatile keyword',
    question: 'What does the volatile keyword do in Java?',
    answer: `# volatile Keyword

**Purpose**: Ensures visibility of changes across threads.

**Key Points**:
- Prevents caching of variable in CPU cache
- Ensures reads/writes go directly to main memory
- Does NOT guarantee atomicity
- Lighter than synchronized

\`\`\`java
public class VolatileExample {
    private volatile boolean flag = false;

    // Thread 1
    public void setFlag() {
        flag = true; // Visible to all threads
    }

    // Thread 2
    public void checkFlag() {
        while (!flag) {
            // Will see the change
        }
    }
}
\`\`\`

**Use Case**: Simple flags, double-checked locking pattern.`,
    difficulty: 'hard',
    category: 'Concurrency',
    tags: ['volatile', 'multithreading', 'visibility'],
    video_url: 'https://www.youtube.com/watch?v=nhYIEqt-jvY',
    created_at: '2024-01-15T10:25:00Z',
    updated_at: '2024-01-15T10:25:00Z',
  },
  {
    id: 'java-7',
    title: 'What is the difference between fail-fast and fail-safe iterators?',
    question: 'Explain fail-fast vs fail-safe iterators in Java Collections.',
    answer: `# Fail-Fast vs Fail-Safe Iterators

**Fail-Fast**:
- Throws ConcurrentModificationException if modified during iteration
- Works on original collection
- ArrayList, HashMap, HashSet

**Fail-Safe**:
- Works on clone/copy of collection
- Allows modifications during iteration
- ConcurrentHashMap, CopyOnWriteArrayList

\`\`\`java
// Fail-fast
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
for (String s : list) {
    list.remove(s); // ConcurrentModificationException
}

// Fail-safe
ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
for (String key : map.keySet()) {
    map.put("new", "value"); // Works fine
}
\`\`\``,
    difficulty: 'hard',
    category: 'Collections',
    tags: ['iterators', 'collections', 'concurrency'],
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'java-8',
    title: 'Explain the Java Memory Model',
    question: 'Describe the Java Memory Model and its components.',
    answer: `# Java Memory Model

**Heap Memory**:
- Stores objects and class instances
- Shared across all threads
- Garbage collected
- OutOfMemoryError when full

**Stack Memory**:
- Stores method calls and local variables
- Thread-specific
- LIFO structure
- StackOverflowError when full

**Method Area**:
- Class-level data (metadata, static variables)
- Shared across threads
- Part of heap in Java 8+

**Program Counter Register**:
- Current instruction address
- Thread-specific

\`\`\`java
public void example() {
    int x = 10; // Stack
    String str = new String("Hello"); // Reference on stack, object on heap

    static int y = 20; // Method area
}
\`\`\``,
    difficulty: 'hard',
    category: 'JVM',
    tags: ['memory', 'jvm', 'heap', 'stack'],
    video_url: 'https://www.youtube.com/watch?v=QMq1kWy56iU',
    created_at: '2024-01-15T10:35:00Z',
    updated_at: '2024-01-15T10:35:00Z',
  },
  {
    id: 'java-9',
    title: 'What are the different types of references in Java?',
    question: 'Explain Strong, Soft, Weak, and Phantom references.',
    answer: `# Java Reference Types

**Strong Reference**:
- Normal reference
- GC will not collect while reachable
\`\`\`java
Object obj = new Object(); // Strong reference
\`\`\`

**Soft Reference**:
- Collected only when memory is low
- Good for caching
\`\`\`java
SoftReference<Object> soft = new SoftReference<>(obj);
\`\`\`

**Weak Reference**:
- Collected in next GC cycle
- Used in WeakHashMap
\`\`\`java
WeakReference<Object> weak = new WeakReference<>(obj);
\`\`\`

**Phantom Reference**:
- Used for pre-mortem cleanup
- Cannot access object through it
\`\`\`java
PhantomReference<Object> phantom =
    new PhantomReference<>(obj, refQueue);
\`\`\``,
    difficulty: 'hard',
    category: 'Memory Management',
    tags: ['references', 'gc', 'memory'],
    created_at: '2024-01-15T10:40:00Z',
    updated_at: '2024-01-15T10:40:00Z',
  },
  {
    id: 'java-10',
    title: 'Explain the Stream API and lazy evaluation',
    question: 'How does the Java Stream API implement lazy evaluation?',
    answer: `# Stream API and Lazy Evaluation

**Lazy Evaluation**: Operations are not executed until a terminal operation is called.

**Intermediate Operations** (lazy):
- map, filter, flatMap, distinct, sorted, peek

**Terminal Operations** (trigger execution):
- forEach, collect, reduce, count, anyMatch

\`\`\`java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Nothing executes yet
Stream<Integer> stream = numbers.stream()
    .filter(n -> {
        System.out.println("Filtering: " + n);
        return n > 2;
    })
    .map(n -> {
        System.out.println("Mapping: " + n);
        return n * 2;
    });

// Now operations execute
List<Integer> result = stream.collect(Collectors.toList());
// Output: Filtering: 1, Filtering: 2, Filtering: 3, Mapping: 3, ...
\`\`\`

**Benefits**: Memory efficiency, short-circuiting, optimization.`,
    difficulty: 'medium',
    category: 'Streams',
    tags: ['streams', 'functional', 'lazy-evaluation'],
    created_at: '2024-01-15T10:45:00Z',
    updated_at: '2024-01-15T10:45:00Z',
  },
  {
    id: 'java-11',
    title: 'What is method overloading and overriding?',
    question: 'Explain the difference between method overloading and overriding.',
    answer: `# Method Overloading vs Overriding

**Overloading** (Compile-time polymorphism):
- Same method name, different parameters
- In same class
- Return type can be different

**Overriding** (Runtime polymorphism):
- Same method signature
- In parent-child classes
- Return type must be same or covariant

\`\`\`java
// Overloading
public class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// Overriding
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
\`\`\``,
    difficulty: 'easy',
    category: 'OOP',
    tags: ['polymorphism', 'overloading', 'overriding'],
    created_at: '2024-01-15T10:50:00Z',
    updated_at: '2024-01-15T10:50:00Z',
  },
  {
    id: 'java-12',
    title: 'Explain the final keyword',
    question: 'What are the uses of the final keyword in Java?',
    answer: `# final Keyword

**1. Final Variable**:
- Cannot be reassigned
- Must be initialized

\`\`\`java
final int MAX = 100;
// MAX = 200; // Compilation error
\`\`\`

**2. Final Method**:
- Cannot be overridden

\`\`\`java
class Parent {
    final void display() { }
}
class Child extends Parent {
    // void display() { } // Compilation error
}
\`\`\`

**3. Final Class**:
- Cannot be extended

\`\`\`java
final class Constants { }
// class MyConstants extends Constants { } // Error
\`\`\`

**Use Cases**: Constants, preventing inheritance, security, performance optimization.`,
    difficulty: 'easy',
    category: 'Core Java',
    tags: ['final', 'keywords', 'immutability'],
    created_at: '2024-01-15T10:55:00Z',
    updated_at: '2024-01-15T10:55:00Z',
  },
  {
    id: 'java-13',
    title: 'What is the difference between abstract class and interface?',
    question: 'Compare abstract classes and interfaces in Java 8+.',
    answer: `# Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| Methods | Concrete + Abstract | Default + Abstract + Static |
| Variables | Any | public static final only |
| Constructor | Yes | No |
| Inheritance | Single | Multiple |
| Access | Any modifier | public only (until Java 9) |

\`\`\`java
// Abstract class
abstract class Vehicle {
    private String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    abstract void start();

    void stop() {
        System.out.println("Stopping");
    }
}

// Interface
interface Drivable {
    void drive();

    default void park() {
        System.out.println("Parking");
    }
}
\`\`\`

**When to Use**:
- Abstract class: IS-A relationship, shared code
- Interface: CAN-DO relationship, multiple inheritance`,
    difficulty: 'medium',
    category: 'OOP',
    tags: ['abstract', 'interface', 'inheritance'],
    video_url: 'https://www.youtube.com/watch?v=Ud6oN5gnXpg',
    created_at: '2024-01-15T11:00:00Z',
    updated_at: '2024-01-15T11:00:00Z',
  },
  {
    id: 'java-14',
    title: 'Explain the synchronized keyword',
    question: 'How does synchronization work in Java?',
    answer: `# synchronized Keyword

**Purpose**: Ensures thread-safe access to shared resources.

**1. Synchronized Method**:
\`\`\`java
public synchronized void increment() {
    count++;
}
\`\`\`

**2. Synchronized Block**:
\`\`\`java
public void increment() {
    synchronized(this) {
        count++;
    }
}
\`\`\`

**3. Static Synchronized**:
\`\`\`java
public static synchronized void staticMethod() {
    // Locks on Class object
}
\`\`\`

**How It Works**:
- Acquires intrinsic lock (monitor)
- Only one thread can execute at a time
- Other threads wait

**Drawbacks**: Performance overhead, potential deadlocks.`,
    difficulty: 'hard',
    category: 'Concurrency',
    tags: ['synchronized', 'threading', 'locks'],
    created_at: '2024-01-15T11:05:00Z',
    updated_at: '2024-01-15T11:05:00Z',
  },
  {
    id: 'java-15',
    title: 'What are Java 8 functional interfaces?',
    question: 'Explain functional interfaces and lambda expressions.',
    answer: `# Functional Interfaces

**Definition**: Interface with exactly one abstract method (SAM).

**Built-in Functional Interfaces**:
- \`Function<T, R>\`: Takes T, returns R
- \`Predicate<T>\`: Takes T, returns boolean
- \`Consumer<T>\`: Takes T, returns void
- \`Supplier<T>\`: Takes nothing, returns T

\`\`\`java
// Custom functional interface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

// Lambda expression
Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;

System.out.println(add.calculate(5, 3)); // 8
System.out.println(multiply.calculate(5, 3)); // 15

// Method reference
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);
\`\`\``,
    difficulty: 'medium',
    category: 'Functional Programming',
    tags: ['lambda', 'functional-interface', 'java8'],
    created_at: '2024-01-15T11:10:00Z',
    updated_at: '2024-01-15T11:10:00Z',
  },
  {
    id: 'java-16',
    title: 'Explain the Singleton design pattern',
    question: 'How do you implement a thread-safe Singleton in Java?',
    answer: `# Singleton Pattern

**1. Eager Initialization**:
\`\`\`java
public class Singleton {
    private static final Singleton INSTANCE = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
\`\`\`

**2. Lazy Initialization (Thread-Safe)**:
\`\`\`java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
\`\`\`

**3. Bill Pugh (Best)**:
\`\`\`java
public class Singleton {
    private Singleton() {}

    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}
\`\`\``,
    difficulty: 'medium',
    category: 'Design Patterns',
    tags: ['singleton', 'design-pattern', 'thread-safety'],
    video_url: 'https://www.youtube.com/watch?v=hUE_j6q0LTQ',
    created_at: '2024-01-15T11:15:00Z',
    updated_at: '2024-01-15T11:15:00Z',
  },
  {
    id: 'java-17',
    title: 'What is garbage collection in Java?',
    question: 'Explain the garbage collection process and different GC algorithms.',
    answer: `# Garbage Collection

**Purpose**: Automatic memory management to reclaim unused objects.

**How It Works**:
1. Mark: Identify reachable objects
2. Sweep: Remove unreachable objects
3. Compact: Defragment memory (optional)

**GC Algorithms**:

**Serial GC**: Single-threaded, small applications
\`\`\`bash
-XX:+UseSerialGC
\`\`\`

**Parallel GC**: Multi-threaded, throughput-oriented
\`\`\`bash
-XX:+UseParallelGC
\`\`\`

**CMS (Concurrent Mark Sweep)**: Low pause time
\`\`\`bash
-XX:+UseConcMarkSweepGC
\`\`\`

**G1 GC**: Balanced, default in Java 9+
\`\`\`bash
-XX:+UseG1GC
\`\`\`

**ZGC**: Ultra-low latency
\`\`\`bash
-XX:+UseZGC
\`\`\`

**Generations**:
- Young (Eden + Survivor spaces)
- Old/Tenured
- Metaspace (Java 8+)`,
    difficulty: 'hard',
    category: 'Memory Management',
    tags: ['gc', 'memory', 'jvm'],
    created_at: '2024-01-15T11:20:00Z',
    updated_at: '2024-01-15T11:20:00Z',
  },
  {
    id: 'java-18',
    title: 'Explain the ExecutorService framework',
    question: 'How does ExecutorService work for thread pool management?',
    answer: `# ExecutorService Framework

**Purpose**: Manages thread pool for concurrent task execution.

**Creating Thread Pools**:
\`\`\`java
// Fixed thread pool
ExecutorService executor = Executors.newFixedThreadPool(5);

// Cached thread pool (dynamic)
ExecutorService executor = Executors.newCachedThreadPool();

// Single thread executor
ExecutorService executor = Executors.newSingleThreadExecutor();

// Scheduled executor
ScheduledExecutorService scheduler =
    Executors.newScheduledThreadPool(2);
\`\`\`

**Using ExecutorService**:
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit tasks
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

// Get result
Integer result = future.get(); // Blocks until complete

// Shutdown
executor.shutdown();
executor.awaitTermination(5, TimeUnit.SECONDS);
\`\`\`

**Benefits**: Thread reuse, resource management, task scheduling.`,
    difficulty: 'hard',
    category: 'Concurrency',
    tags: ['executor', 'thread-pool', 'concurrency'],
    created_at: '2024-01-15T11:25:00Z',
    updated_at: '2024-01-15T11:25:00Z',
  },
  {
    id: 'java-19',
    title: 'What is the difference between ArrayList and LinkedList?',
    question: 'Compare ArrayList and LinkedList performance and use cases.',
    answer: `# ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| Get/Set | O(1) | O(n) |
| Add (end) | O(1)* | O(1) |
| Add (middle) | O(n) | O(n) |
| Remove | O(n) | O(n) |
| Memory | Less overhead | More overhead (nodes) |

\`\`\`java
// ArrayList - backed by dynamic array
List<String> arrayList = new ArrayList<>();
arrayList.add("A"); // Fast
String item = arrayList.get(0); // Fast O(1)

// LinkedList - doubly-linked list
List<String> linkedList = new LinkedList<>();
linkedList.add("A"); // Fast
String item = linkedList.get(0); // Slow O(n)
\`\`\`

**Use ArrayList when**:
- Frequent random access
- More reads than writes
- Known approximate size

**Use LinkedList when**:
- Frequent insertions/deletions at beginning
- Implementing queue/deque
- No random access needed`,
    difficulty: 'medium',
    category: 'Collections',
    tags: ['arraylist', 'linkedlist', 'data-structures'],
    created_at: '2024-01-15T11:30:00Z',
    updated_at: '2024-01-15T11:30:00Z',
  },
  {
    id: 'java-20',
    title: 'Explain the try-with-resources statement',
    question: 'How does try-with-resources work in Java?',
    answer: `# try-with-resources

**Purpose**: Automatic resource management (Java 7+).

**Syntax**:
\`\`\`java
try (ResourceType resource = new ResourceType()) {
    // Use resource
} catch (Exception e) {
    // Handle exception
}
// Resource automatically closed
\`\`\`

**Example**:
\`\`\`java
// Old way
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("file.txt"));
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (br != null) {
        try {
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// New way
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
}
// Automatically closed
\`\`\`

**Requirements**: Resource must implement AutoCloseable.`,
    difficulty: 'easy',
    category: 'Exception Handling',
    tags: ['try-with-resources', 'autocloseable', 'io'],
    created_at: '2024-01-15T11:35:00Z',
    updated_at: '2024-01-15T11:35:00Z',
  },
]

// ============================================================================
// GO QUESTIONS (25 questions)
// ============================================================================

export const goQuestions: InterviewQuestion[] = [
  {
    id: 'go-1',
    title: 'What are goroutines and how do they differ from threads?',
    question: 'Explain goroutines and their advantages over OS threads.',
    answer: `# Goroutines vs Threads

**Goroutines**:
- Lightweight (2KB initial stack)
- Managed by Go runtime
- Multiplexed onto OS threads
- Fast creation and context switching

**OS Threads**:
- Heavy (1MB+ stack)
- Managed by OS
- Direct OS scheduling
- Expensive creation and switching

\`\`\`go
// Creating goroutines
func main() {
    // Start 10,000 goroutines easily
    for i := 0; i < 10000; i++ {
        go func(id int) {
            fmt.Println("Goroutine", id)
        }(i)
    }

    time.Sleep(time.Second)
}
\`\`\`

**Advantages**:
- Can create millions of goroutines
- Efficient scheduling (M:N model)
- Built-in communication via channels`,
    difficulty: 'easy',
    category: 'Concurrency',
    tags: ['goroutines', 'concurrency', 'threads'],
    video_url: 'https://www.youtube.com/watch?v=f6kdp27TYZs',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'go-2',
    title: 'Explain channels and their types',
    question: 'What are channels in Go and what are the different types?',
    answer: `# Channels in Go

**Definition**: Typed conduits for communication between goroutines.

**Types**:

**1. Unbuffered Channel**:
\`\`\`go
ch := make(chan int) // Blocks until receiver ready
ch <- 42 // Send (blocks)
val := <-ch // Receive (blocks)
\`\`\`

**2. Buffered Channel**:
\`\`\`go
ch := make(chan int, 3) // Buffer size 3
ch <- 1 // Doesn't block (buffer has space)
ch <- 2
ch <- 3
ch <- 4 // Blocks (buffer full)
\`\`\`

**3. Directional Channels**:
\`\`\`go
// Send-only
func send(ch chan<- int) {
    ch <- 42
}

// Receive-only
func receive(ch <-chan int) {
    val := <-ch
}
\`\`\`

**Channel Operations**:
\`\`\`go
close(ch) // Close channel
val, ok := <-ch // Check if closed
\`\`\``,
    difficulty: 'medium',
    category: 'Concurrency',
    tags: ['channels', 'concurrency', 'communication'],
    created_at: '2024-01-16T10:05:00Z',
    updated_at: '2024-01-16T10:05:00Z',
  },
  {
    id: 'go-3',
    title: 'What is the select statement?',
    question: 'Explain the select statement and its use cases.',
    answer: `# Select Statement

**Purpose**: Wait on multiple channel operations simultaneously.

**Basic Select**:
\`\`\`go
select {
case msg := <-ch1:
    fmt.Println("Received from ch1:", msg)
case msg := <-ch2:
    fmt.Println("Received from ch2:", msg)
case ch3 <- 42:
    fmt.Println("Sent to ch3")
default:
    fmt.Println("No channel ready")
}
\`\`\`

**Timeout Pattern**:
\`\`\`go
select {
case result := <-ch:
    fmt.Println("Got result:", result)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout!")
}
\`\`\`

**Done Pattern**:
\`\`\`go
select {
case <-done:
    return
case result := <-ch:
    process(result)
}
\`\`\`

**Features**:
- Random choice if multiple ready
- Non-blocking with default
- Can be used for timeouts`,
    difficulty: 'medium',
    category: 'Concurrency',
    tags: ['select', 'channels', 'patterns'],
    video_url: 'https://www.youtube.com/watch?v=1c7ttSJDMAI',
    created_at: '2024-01-16T10:10:00Z',
    updated_at: '2024-01-16T10:10:00Z',
  },
  {
    id: 'go-4',
    title: 'Explain defer, panic, and recover',
    question: 'How do defer, panic, and recover work in Go?',
    answer: `# defer, panic, recover

**defer**:
- Executes function call at end of surrounding function
- LIFO order (stack)
\`\`\`go
func example() {
    defer fmt.Println("3")
    defer fmt.Println("2")
    fmt.Println("1")
}
// Output: 1, 2, 3
\`\`\`

**panic**:
- Stops normal execution
- Runs deferred functions
- Crashes program if not recovered
\`\`\`go
func willPanic() {
    panic("something went wrong")
}
\`\`\`

**recover**:
- Regains control after panic
- Only works in deferred functions
\`\`\`go
func safeDivide(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from", r)
            result = 0
        }
    }()
    return a / b // Might panic
}
\`\`\`

**Use Cases**: Resource cleanup (defer), error handling (panic/recover)`,
    difficulty: 'hard',
    category: 'Error Handling',
    tags: ['defer', 'panic', 'recover'],
    created_at: '2024-01-16T10:15:00Z',
    updated_at: '2024-01-16T10:15:00Z',
  },
  {
    id: 'go-5',
    title: 'What are interfaces in Go?',
    question: 'Explain Go interfaces and implicit implementation.',
    answer: `# Interfaces in Go

**Definition**: Set of method signatures. Types implement interfaces implicitly.

**Basic Interface**:
\`\`\`go
type Writer interface {
    Write([]byte) (int, error)
}

// Implicitly implements Writer
type FileWriter struct{}

func (f FileWriter) Write(data []byte) (int, error) {
    // Write to file
    return len(data), nil
}
\`\`\`

**Empty Interface** (\`interface{}\` or \`any\`):
\`\`\`go
func PrintAnything(v interface{}) {
    fmt.Println(v)
}

PrintAnything(42)
PrintAnything("hello")
PrintAnything([]int{1, 2, 3})
\`\`\`

**Type Assertion**:
\`\`\`go
var i interface{} = "hello"

s := i.(string) // Type assertion
fmt.Println(s)

s, ok := i.(string) // Safe type assertion
if ok {
    fmt.Println(s)
}
\`\`\`

**Benefits**: Duck typing, loose coupling, easy testing.`,
    difficulty: 'medium',
    category: 'Interfaces',
    tags: ['interfaces', 'types', 'polymorphism'],
    created_at: '2024-01-16T10:20:00Z',
    updated_at: '2024-01-16T10:20:00Z',
  },
  {
    id: 'go-6',
    title: 'Explain slices vs arrays',
    question: 'What are the differences between slices and arrays in Go?',
    answer: `# Slices vs Arrays

**Arrays**:
- Fixed size
- Value type
- Size is part of type

\`\`\`go
var arr [5]int // Fixed size 5
arr[0] = 1

// Arrays of different sizes are different types
var arr1 [5]int
var arr2 [10]int // Different type
\`\`\`

**Slices**:
- Dynamic size
- Reference type
- Built on arrays

\`\`\`go
slice := []int{1, 2, 3} // Dynamic
slice = append(slice, 4) // Can grow

// Slice internals
// - pointer to underlying array
// - length
// - capacity
fmt.Println(len(slice)) // 4
fmt.Println(cap(slice)) // Usually > length
\`\`\`

**Slicing**:
\`\`\`go
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4] // [2, 3, 4]
slice2 := slice[:2] // [2, 3]
\`\`\`

**Use**: Almost always use slices over arrays.`,
    difficulty: 'easy',
    category: 'Data Structures',
    tags: ['slices', 'arrays', 'collections'],
    video_url: 'https://www.youtube.com/watch?v=XKcTtZI5Xvw',
    created_at: '2024-01-16T10:25:00Z',
    updated_at: '2024-01-16T10:25:00Z',
  },
  {
    id: 'go-7',
    title: 'What is the difference between make and new?',
    question: 'Explain make() vs new() in Go.',
    answer: `# make vs new

**new(T)**:
- Allocates zeroed memory
- Returns \`*T\` (pointer)
- Works for any type

\`\`\`go
p := new(int) // *int
*p = 42
fmt.Println(*p) // 42

type Person struct {
    Name string
}
person := new(Person) // *Person
person.Name = "Alice"
\`\`\`

**make(T, args)**:
- Initializes and allocates
- Returns \`T\` (not pointer)
- Only for slices, maps, channels

\`\`\`go
// Slice
slice := make([]int, 5) // len=5, cap=5
slice := make([]int, 5, 10) // len=5, cap=10

// Map
m := make(map[string]int)

// Channel
ch := make(chan int, 5) // buffered channel
\`\`\`

**Key Difference**:
- \`new\`: Allocates memory (returns pointer)
- \`make\`: Initializes data structure (returns value)`,
    difficulty: 'medium',
    category: 'Memory',
    tags: ['make', 'new', 'allocation'],
    created_at: '2024-01-16T10:30:00Z',
    updated_at: '2024-01-16T10:30:00Z',
  },
  {
    id: 'go-8',
    title: 'Explain Go\'s garbage collector',
    question: 'How does garbage collection work in Go?',
    answer: `# Go Garbage Collector

**Algorithm**: Concurrent mark-and-sweep (since Go 1.5)

**Phases**:
1. **Mark Setup**: STW (stop-the-world) - very brief
2. **Marking**: Concurrent - identifies reachable objects
3. **Mark Termination**: STW - finalize marking
4. **Sweeping**: Concurrent - reclaim memory

**Goals**:
- Low latency (sub-millisecond pauses)
- High throughput
- Good memory utilization

**Tuning**:
\`\`\`go
// Set GC target percentage
// GOGC=100 (default): GC when heap doubles
// GOGC=200: GC when heap triples
export GOGC=100

// Memory limit (Go 1.19+)
export GOMEMLIMIT=4GiB
\`\`\`

**Manual Control**:
\`\`\`go
import "runtime"

// Force GC
runtime.GC()

// Get GC stats
var stats runtime.MemStats
runtime.ReadMemStats(&stats)
fmt.Println(stats.NumGC) // Number of GC cycles
\`\`\`

**Best Practices**: Avoid unnecessary allocations, reuse objects, profile.`,
    difficulty: 'hard',
    category: 'Memory',
    tags: ['gc', 'memory', 'performance'],
    created_at: '2024-01-16T10:35:00Z',
    updated_at: '2024-01-16T10:35:00Z',
  },
  {
    id: 'go-9',
    title: 'What is a mutex and when to use it?',
    question: 'Explain sync.Mutex and sync.RWMutex in Go.',
    answer: `# Mutex in Go

**sync.Mutex**:
- Mutual exclusion lock
- Protects shared data
- Blocks other goroutines

\`\`\`go
type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}
\`\`\`

**sync.RWMutex**:
- Multiple readers OR one writer
- Better for read-heavy workloads

\`\`\`go
type Cache struct {
    mu    sync.RWMutex
    items map[string]string
}

func (c *Cache) Get(key string) string {
    c.mu.RLock() // Read lock
    defer c.mu.RUnlock()
    return c.items[key]
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock() // Write lock
    defer c.mu.Unlock()
    c.items[key] = value
}
\`\`\`

**When to Use**: Protecting shared memory. Prefer channels for communication.`,
    difficulty: 'medium',
    category: 'Concurrency',
    tags: ['mutex', 'sync', 'thread-safety'],
    video_url: 'https://www.youtube.com/watch?v=HoDmvY7Ehs8',
    created_at: '2024-01-16T10:40:00Z',
    updated_at: '2024-01-16T10:40:00Z',
  },
  {
    id: 'go-10',
    title: 'Explain the context package',
    question: 'What is context.Context and how is it used?',
    answer: `# Context Package

**Purpose**: Carry deadlines, cancellation signals, and request-scoped values.

**Types**:

**1. Background Context**:
\`\`\`go
ctx := context.Background() // Root context
\`\`\`

**2. WithCancel**:
\`\`\`go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

go func(ctx context.Context) {
    select {
    case <-ctx.Done():
        fmt.Println("Cancelled")
        return
    }
}(ctx)

cancel() // Trigger cancellation
\`\`\`

**3. WithTimeout**:
\`\`\`go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

select {
case result := <-doWork(ctx):
    fmt.Println("Success:", result)
case <-ctx.Done():
    fmt.Println("Timeout or cancelled")
}
\`\`\`

**4. WithValue**:
\`\`\`go
ctx := context.WithValue(context.Background(), "userID", 123)
userID := ctx.Value("userID").(int)
\`\`\`

**Best Practices**:
- Always pass context as first parameter
- Don't store contexts in structs
- Use context.TODO() when unsure`,
    difficulty: 'hard',
    category: 'Concurrency',
    tags: ['context', 'cancellation', 'timeout'],
    created_at: '2024-01-16T10:45:00Z',
    updated_at: '2024-01-16T10:45:00Z',
  },
  {
    id: 'go-11',
    title: 'What are struct tags?',
    question: 'Explain struct tags and their common uses.',
    answer: `# Struct Tags

**Definition**: Metadata attached to struct fields.

**JSON Tags**:
\`\`\`go
type User struct {
    ID        int    \`json:"id"\`
    Name      string \`json:"name"\`
    Email     string \`json:"email,omitempty"\` // Omit if empty
    Password  string \`json:"-"\` // Never serialize
    Age       int    \`json:"age,string"\` // Convert to string
}

user := User{ID: 1, Name: "Alice", Email: "alice@example.com"}
json, _ := json.Marshal(user)
// {"id":1,"name":"Alice","email":"alice@example.com"}
\`\`\`

**Database Tags**:
\`\`\`go
type Product struct {
    ID    int    \`db:"id" gorm:"primaryKey"\`
    Name  string \`db:"name" gorm:"size:255"\`
    Price float64 \`db:"price"\`
}
\`\`\`

**Validation Tags**:
\`\`\`go
type SignupForm struct {
    Email    string \`validate:"required,email"\`
    Password string \`validate:"required,min=8"\`
    Age      int    \`validate:"gte=18,lte=120"\`
}
\`\`\`

**Multiple Tags**:
\`\`\`go
type Model struct {
    Field string \`json:"field" db:"field_name" validate:"required"\`
}
\`\`\``,
    difficulty: 'easy',
    category: 'Structs',
    tags: ['struct-tags', 'json', 'serialization'],
    created_at: '2024-01-16T10:50:00Z',
    updated_at: '2024-01-16T10:50:00Z',
  },
  {
    id: 'go-12',
    title: 'Explain method receivers in Go',
    question: 'What are value receivers vs pointer receivers?',
    answer: `# Method Receivers

**Value Receiver**:
- Receives copy of value
- Cannot modify original
- Works with both values and pointers

\`\`\`go
type Counter struct {
    count int
}

func (c Counter) Value() int {
    return c.count
}

func (c Counter) TryIncrement() {
    c.count++ // Modifies copy, not original
}

counter := Counter{count: 0}
counter.TryIncrement()
fmt.Println(counter.Value()) // Still 0
\`\`\`

**Pointer Receiver**:
- Receives pointer to value
- Can modify original
- More efficient for large structs

\`\`\`go
func (c *Counter) Increment() {
    c.count++ // Modifies original
}

counter := Counter{count: 0}
counter.Increment()
fmt.Println(counter.Value()) // Now 1
\`\`\`

**When to Use Pointer Receiver**:
1. Need to modify the receiver
2. Large structs (avoid copying)
3. Consistency (if one method needs pointer, use for all)`,
    difficulty: 'medium',
    category: 'Methods',
    tags: ['receivers', 'methods', 'pointers'],
    created_at: '2024-01-16T10:55:00Z',
    updated_at: '2024-01-16T10:55:00Z',
  },
  {
    id: 'go-13',
    title: 'What is embedding in Go?',
    question: 'Explain struct embedding and composition.',
    answer: `# Embedding in Go

**Struct Embedding**:
- Composition over inheritance
- Embedded fields promoted

\`\`\`go
type Address struct {
    Street string
    City   string
}

type Person struct {
    Name    string
    Age     int
    Address // Embedded
}

person := Person{
    Name: "Alice",
    Age:  30,
    Address: Address{
        Street: "123 Main St",
        City:   "NYC",
    },
}

// Promoted fields
fmt.Println(person.Street) // Direct access
fmt.Println(person.Address.Street) // Also works
\`\`\`

**Interface Embedding**:
\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader // Embedded interface
    Writer
}
\`\`\`

**Method Promotion**:
\`\`\`go
type Base struct{}

func (b Base) Method() {
    fmt.Println("Base method")
}

type Derived struct {
    Base
}

d := Derived{}
d.Method() // Calls Base.Method()
\`\`\``,
    difficulty: 'medium',
    category: 'Structs',
    tags: ['embedding', 'composition', 'inheritance'],
    created_at: '2024-01-16T11:00:00Z',
    updated_at: '2024-01-16T11:00:00Z',
  },
  {
    id: 'go-14',
    title: 'Explain the error interface',
    question: 'How does error handling work in Go?',
    answer: `# Error Handling in Go

**Error Interface**:
\`\`\`go
type error interface {
    Error() string
}
\`\`\`

**Creating Errors**:
\`\`\`go
// Using errors.New
err := errors.New("something went wrong")

// Using fmt.Errorf
err := fmt.Errorf("failed to process %s: %w", filename, originalErr)
\`\`\`

**Custom Errors**:
\`\`\`go
type ValidationError struct {
    Field string
    Issue string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation error on field %s: %s", e.Field, e.Issue)
}
\`\`\`

**Error Wrapping (Go 1.13+)**:
\`\`\`go
import "errors"

originalErr := errors.New("database connection failed")
wrappedErr := fmt.Errorf("failed to initialize: %w", originalErr)

// Unwrap
if errors.Is(wrappedErr, originalErr) {
    fmt.Println("Contains original error")
}

// Type checking
var valErr ValidationError
if errors.As(err, &valErr) {
    fmt.Println("Field:", valErr.Field)
}
\`\`\`

**Best Practice**: Return errors, don't panic (except for truly unrecoverable errors).`,
    difficulty: 'medium',
    category: 'Error Handling',
    tags: ['errors', 'error-handling', 'interfaces'],
    video_url: 'https://www.youtube.com/watch?v=IKoSsJFdRtI',
    created_at: '2024-01-16T11:05:00Z',
    updated_at: '2024-01-16T11:05:00Z',
  },
  {
    id: 'go-15',
    title: 'What is the sync.WaitGroup?',
    question: 'Explain sync.WaitGroup and its usage.',
    answer: `# sync.WaitGroup

**Purpose**: Wait for collection of goroutines to finish.

**Methods**:
- \`Add(delta int)\`: Add goroutines to wait for
- \`Done()\`: Decrement counter (usually deferred)
- \`Wait()\`: Block until counter is zero

**Example**:
\`\`\`go
func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Println("Goroutine", id)
            time.Sleep(time.Second)
        }(i)
    }

    wg.Wait() // Wait for all goroutines
    fmt.Println("All done!")
}
\`\`\`

**Common Patterns**:
\`\`\`go
// Worker pool
var wg sync.WaitGroup
jobs := make(chan int, 100)

// Start workers
for w := 0; w < 3; w++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        for job := range jobs {
            process(job)
        }
    }()
}

// Send jobs
for j := 0; j < 10; j++ {
    jobs <- j
}
close(jobs)

wg.Wait() // Wait for all workers
\`\`\``,
    difficulty: 'easy',
    category: 'Concurrency',
    tags: ['waitgroup', 'sync', 'goroutines'],
    created_at: '2024-01-16T11:10:00Z',
    updated_at: '2024-01-16T11:10:00Z',
  },
  {
    id: 'go-16',
    title: 'Explain the init() function',
    question: 'What is the init() function and when does it run?',
    answer: `# init() Function

**Purpose**: Package initialization before main().

**Execution Order**:
1. Import dependencies
2. Initialize package-level variables
3. Call init() functions (in order they appear)
4. Call main() (if main package)

**Example**:
\`\`\`go
package main

import "fmt"

var globalVar = initGlobalVar()

func initGlobalVar() int {
    fmt.Println("2. Initializing global variable")
    return 42
}

func init() {
    fmt.Println("3. First init()")
}

func init() {
    fmt.Println("4. Second init()")
}

func main() {
    fmt.Println("5. main()")
}

// Output:
// 2. Initializing global variable
// 3. First init()
// 4. Second init()
// 5. main()
\`\`\`

**Use Cases**:
- Database connection setup
- Configuration loading
- Registering drivers/codecs
- Validation

**Best Practices**:
- Keep init() simple
- Avoid side effects
- Don't rely on init() order across packages`,
    difficulty: 'easy',
    category: 'Initialization',
    tags: ['init', 'initialization', 'lifecycle'],
    created_at: '2024-01-16T11:15:00Z',
    updated_at: '2024-01-16T11:15:00Z',
  },
  {
    id: 'go-17',
    title: 'What are Go modules?',
    question: 'Explain Go modules and dependency management.',
    answer: `# Go Modules

**Definition**: Official dependency management system (Go 1.11+).

**Initialization**:
\`\`\`bash
# Create new module
go mod init github.com/username/project

# This creates go.mod file
\`\`\`

**go.mod File**:
\`\`\`go
module github.com/username/project

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/lib/pq v1.10.9
)

replace github.com/old/package => github.com/new/package v1.0.0
\`\`\`

**Common Commands**:
\`\`\`bash
# Add dependency
go get github.com/gin-gonic/gin

# Update dependency
go get -u github.com/gin-gonic/gin

# Update all dependencies
go get -u ./...

# Clean up unused dependencies
go mod tidy

# Download dependencies
go mod download

# Vendor dependencies (copy to vendor/)
go mod vendor
\`\`\`

**go.sum File**: Checksums for security and verification.`,
    difficulty: 'easy',
    category: 'Modules',
    tags: ['modules', 'dependencies', 'go-mod'],
    created_at: '2024-01-16T11:20:00Z',
    updated_at: '2024-01-16T11:20:00Z',
  },
  {
    id: 'go-18',
    title: 'Explain reflection in Go',
    question: 'What is reflection and when should it be used?',
    answer: `# Reflection in Go

**Definition**: Inspect and manipulate objects at runtime.

**Basic Reflection**:
\`\`\`go
import "reflect"

func inspectValue(x interface{}) {
    v := reflect.ValueOf(x)
    t := reflect.TypeOf(x)

    fmt.Println("Type:", t)
    fmt.Println("Kind:", v.Kind())
    fmt.Println("Value:", v)
}

inspectValue(42) // Type: int, Kind: int, Value: 42
\`\`\`

**Modifying Values**:
\`\`\`go
func modifyValue(x interface{}) {
    v := reflect.ValueOf(x)

    // Must pass pointer to modify
    if v.Kind() == reflect.Ptr && v.Elem().CanSet() {
        v.Elem().SetInt(100)
    }
}

num := 42
modifyValue(&num)
fmt.Println(num) // 100
\`\`\`

**Struct Field Iteration**:
\`\`\`go
type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

p := Person{"Alice", 30}
v := reflect.ValueOf(p)
t := reflect.TypeOf(p)

for i := 0; i < v.NumField(); i++ {
    field := t.Field(i)
    value := v.Field(i)
    tag := field.Tag.Get("json")

    fmt.Printf("%s: %v (tag: %s)\n", field.Name, value, tag)
}
\`\`\`

**When to Use**: JSON/XML encoding, ORM, dependency injection.
**Warning**: Slow, untyped, avoid when possible.`,
    difficulty: 'hard',
    category: 'Advanced',
    tags: ['reflection', 'metaprogramming', 'runtime'],
    created_at: '2024-01-16T11:25:00Z',
    updated_at: '2024-01-16T11:25:00Z',
  },
  {
    id: 'go-19',
    title: 'What is a race condition?',
    question: 'Explain race conditions and how to detect them.',
    answer: `# Race Conditions

**Definition**: Multiple goroutines access shared data concurrently, at least one writes.

**Example of Race**:
\`\`\`go
var counter int

func increment() {
    counter++ // Read, increment, write - NOT atomic
}

func main() {
    for i := 0; i < 1000; i++ {
        go increment()
    }
    time.Sleep(time.Second)
    fmt.Println(counter) // Unpredictable result
}
\`\`\`

**Detection**:
\`\`\`bash
# Run with race detector
go run -race main.go
go test -race ./...
go build -race

# Race detector output shows:
# - Where the race occurred
# - Which goroutines were involved
# - Stack traces
\`\`\`

**Solutions**:

**1. Mutex**:
\`\`\`go
var (
    counter int
    mu      sync.Mutex
)

func increment() {
    mu.Lock()
    counter++
    mu.Unlock()
}
\`\`\`

**2. Atomic Operations**:
\`\`\`go
import "sync/atomic"

var counter int64

func increment() {
    atomic.AddInt64(&counter, 1)
}
\`\`\`

**3. Channels**:
\`\`\`go
ch := make(chan int, 1)
ch <- counter
counter = <-ch + 1
ch <- counter
\`\`\``,
    difficulty: 'hard',
    category: 'Concurrency',
    tags: ['race-conditions', 'concurrency', 'debugging'],
    video_url: 'https://www.youtube.com/watch?v=5zXAHh5tJqQ',
    created_at: '2024-01-16T11:30:00Z',
    updated_at: '2024-01-16T11:30:00Z',
  },
  {
    id: 'go-20',
    title: 'Explain type assertions and type switches',
    question: 'How do type assertions and type switches work?',
    answer: `# Type Assertions and Switches

**Type Assertion**:
\`\`\`go
var i interface{} = "hello"

// Type assertion
s := i.(string)
fmt.Println(s) // "hello"

// Safe type assertion
s, ok := i.(string)
if ok {
    fmt.Println("It's a string:", s)
} else {
    fmt.Println("Not a string")
}

// Panic if wrong type
n := i.(int) // panic: interface conversion
\`\`\`

**Type Switch**:
\`\`\`go
func describe(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %s\n", v)
    case bool:
        fmt.Printf("Boolean: %t\n", v)
    case []int:
        fmt.Printf("Slice of ints: %v\n", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}

describe(42) // Integer: 42
describe("hello") // String: hello
describe(true) // Boolean: true
\`\`\`

**Multiple Cases**:
\`\`\`go
switch v := i.(type) {
case int, int64, int32:
    fmt.Println("Some kind of int")
case string:
    fmt.Println("String")
}
\`\`\``,
    difficulty: 'medium',
    category: 'Types',
    tags: ['type-assertion', 'type-switch', 'interfaces'],
    created_at: '2024-01-16T11:35:00Z',
    updated_at: '2024-01-16T11:35:00Z',
  },
  {
    id: 'go-21',
    title: 'What is the sync.Once type?',
    question: 'Explain sync.Once and its use cases.',
    answer: `# sync.Once

**Purpose**: Ensures a function is executed exactly once, even with multiple goroutines.

**Basic Usage**:
\`\`\`go
var once sync.Once
var instance *Database

func GetDatabase() *Database {
    once.Do(func() {
        fmt.Println("Creating database instance")
        instance = &Database{}
    })
    return instance
}

// Multiple calls, but init runs once
db1 := GetDatabase() // "Creating database instance"
db2 := GetDatabase() // No output
fmt.Println(db1 == db2) // true
\`\`\`

**Singleton Pattern**:
\`\`\`go
type Database struct {
    conn string
}

var (
    db   *Database
    once sync.Once
)

func GetDB() *Database {
    once.Do(func() {
        db = &Database{conn: "localhost:5432"}
        // Expensive initialization here
    })
    return db
}
\`\`\`

**Configuration Loading**:
\`\`\`go
type Config struct {
    APIKey string
}

var (
    config *Config
    once   sync.Once
)

func LoadConfig() *Config {
    once.Do(func() {
        // Load config from file
        config = &Config{APIKey: "secret"}
    })
    return config
}
\`\`\`

**Key Points**:
- Thread-safe
- Lazy initialization
- Cannot be reset`,
    difficulty: 'easy',
    category: 'Concurrency',
    tags: ['sync-once', 'singleton', 'initialization'],
    created_at: '2024-01-16T11:40:00Z',
    updated_at: '2024-01-16T11:40:00Z',
  },
  {
    id: 'go-22',
    title: 'Explain variadic functions',
    question: 'What are variadic functions in Go?',
    answer: `# Variadic Functions

**Definition**: Functions that accept variable number of arguments.

**Syntax**:
\`\`\`go
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

// Calling
fmt.Println(sum(1, 2, 3)) // 6
fmt.Println(sum(1, 2, 3, 4, 5)) // 15
fmt.Println(sum()) // 0
\`\`\`

**Passing Slice**:
\`\`\`go
numbers := []int{1, 2, 3, 4}
result := sum(numbers...) // Unpack slice
fmt.Println(result) // 10
\`\`\`

**Mixed Parameters**:
\`\`\`go
// Variadic must be last parameter
func greet(greeting string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s, %s!\n", greeting, name)
    }
}

greet("Hello", "Alice", "Bob", "Charlie")
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!
\`\`\`

**Printf Example**:
\`\`\`go
func Printf(format string, args ...interface{}) {
    // ...
}

Printf("Name: %s, Age: %d", "Alice", 30)
\`\`\``,
    difficulty: 'easy',
    category: 'Functions',
    tags: ['variadic', 'functions', 'parameters'],
    created_at: '2024-01-16T11:45:00Z',
    updated_at: '2024-01-16T11:45:00Z',
  },
  {
    id: 'go-23',
    title: 'What is the blank identifier?',
    question: 'Explain the blank identifier (_) and its uses.',
    answer: `# Blank Identifier (_)

**Purpose**: Discard unwanted values.

**1. Ignoring Return Values**:
\`\`\`go
// Ignore error
value, _ := strconv.Atoi("42")

// Ignore value, keep error
_, err := strconv.Atoi("not a number")

// Multiple returns
result, _, err := multipleReturns()
\`\`\`

**2. Range Loops**:
\`\`\`go
// Ignore index
for _, value := range slice {
    fmt.Println(value)
}

// Ignore value
for index := range slice {
    fmt.Println(index)
}

// Check if key exists in map
if _, exists := myMap["key"]; exists {
    fmt.Println("Key exists")
}
\`\`\`

**3. Import Side Effects**:
\`\`\`go
import (
    _ "github.com/lib/pq" // Import for side effects (init)
)
\`\`\`

**4. Interface Implementation Check**:
\`\`\`go
type MyWriter struct{}

func (w MyWriter) Write(p []byte) (n int, err error) {
    return len(p), nil
}

// Compile-time check
var _ io.Writer = (*MyWriter)(nil)
\`\`\`

**5. Unused Variables**:
\`\`\`go
func example() {
    _ = expensiveOperation() // Run but don't use result
}
\`\`\``,
    difficulty: 'easy',
    category: 'Syntax',
    tags: ['blank-identifier', 'syntax', 'idioms'],
    created_at: '2024-01-16T11:50:00Z',
    updated_at: '2024-01-16T11:50:00Z',
  },
  {
    id: 'go-24',
    title: 'Explain the time package',
    question: 'How does the time package work in Go?',
    answer: `# Time Package

**Time Type**:
\`\`\`go
import "time"

// Current time
now := time.Now()
fmt.Println(now) // 2024-01-16 10:30:45 +0000 UTC

// Specific time
t := time.Date(2024, time.January, 16, 10, 30, 0, 0, time.UTC)
\`\`\`

**Duration**:
\`\`\`go
// Duration types
duration := 5 * time.Second
duration := 10 * time.Minute
duration := 2 * time.Hour

// Operations
future := time.Now().Add(5 * time.Minute)
past := time.Now().Add(-1 * time.Hour)

// Difference
diff := future.Sub(past)
fmt.Println(diff) // 1h5m0s
\`\`\`

**Formatting and Parsing**:
\`\`\`go
// Format (reference time: Mon Jan 2 15:04:05 MST 2006)
formatted := now.Format("2006-01-02 15:04:05")
formatted := now.Format(time.RFC3339)

// Parse
t, err := time.Parse("2006-01-02", "2024-01-16")
\`\`\`

**Timers and Tickers**:
\`\`\`go
// Timer (fires once)
timer := time.NewTimer(2 * time.Second)
<-timer.C
fmt.Println("Timer fired")

// Ticker (fires repeatedly)
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()

for range ticker.C {
    fmt.Println("Tick")
}
\`\`\`

**Sleep**:
\`\`\`go
time.Sleep(2 * time.Second)
\`\`\``,
    difficulty: 'medium',
    category: 'Standard Library',
    tags: ['time', 'duration', 'scheduling'],
    created_at: '2024-01-16T11:55:00Z',
    updated_at: '2024-01-16T11:55:00Z',
  },
  {
    id: 'go-25',
    title: 'What are benchmarks in Go?',
    question: 'Explain how to write and run benchmarks.',
    answer: `# Benchmarks in Go

**Writing Benchmarks**:
\`\`\`go
// file: example_test.go
import "testing"

func BenchmarkFibonacci(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fibonacci(20)
    }
}

func BenchmarkFibonacciParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            Fibonacci(20)
        }
    })
}
\`\`\`

**Running Benchmarks**:
\`\`\`bash
# Run all benchmarks
go test -bench=.

# Run specific benchmark
go test -bench=BenchmarkFibonacci

# Show memory allocations
go test -bench=. -benchmem

# Control iterations
go test -bench=. -benchtime=10s
go test -bench=. -benchtime=1000x

# CPU profiling
go test -bench=. -cpuprofile=cpu.prof
\`\`\`

**Benchmark Output**:
\`\`\`
BenchmarkFibonacci-8    5000000    245 ns/op    0 B/op    0 allocs/op
                        |          |            |         |
                        iterations  ns per op   bytes     allocations
\`\`\`

**Sub-benchmarks**:
\`\`\`go
func BenchmarkCompare(b *testing.B) {
    b.Run("Method1", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            Method1()
        }
    })
    b.Run("Method2", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            Method2()
        }
    })
}
\`\`\``,
    difficulty: 'medium',
    category: 'Testing',
    tags: ['benchmarks', 'testing', 'performance'],
    created_at: '2024-01-16T12:00:00Z',
    updated_at: '2024-01-16T12:00:00Z',
  },
]

// ============================================================================
// COMBINED DATA
// ============================================================================

export const allQuestions: InterviewQuestion[] = [
  ...javaQuestions,
  ...goQuestions,
]

// ============================================================================
// STATISTICS
// ============================================================================

export const mockStats: InterviewStats = {
  total_questions: allQuestions.length,
  by_category: {
    java: javaQuestions.length,
    go: goQuestions.length,
    javascript: 0,
    python: 0,
    'system-design': 0,
    algorithms: 0,
  },
  languageBreakdown: [
    { language: 'Java', count: javaQuestions.length, slug: 'java' },
    { language: 'Go', count: goQuestions.length, slug: 'go' },
    { language: 'JavaScript', count: 0, slug: 'javascript' },
    { language: 'Python', count: 0, slug: 'python' },
    { language: 'System Design', count: 0, slug: 'system-design' },
    { language: 'Algorithms', count: 0, slug: 'algorithms' },
  ],
}

// ============================================================================
// CATEGORIES
// ============================================================================

export const mockCategories: InterviewCategory[] = [
  {
    id: 'cat-java',
    name: 'Java',
    slug: 'java',
    questionCount: javaQuestions.length,
    available: true,
  },
  {
    id: 'cat-go',
    name: 'Go',
    slug: 'go',
    questionCount: goQuestions.length,
    available: true,
  },
  {
    id: 'cat-javascript',
    name: 'JavaScript',
    slug: 'javascript',
    questionCount: 0,
    available: false,
  },
  {
    id: 'cat-python',
    name: 'Python',
    slug: 'python',
    questionCount: 0,
    available: false,
  },
  {
    id: 'cat-system-design',
    name: 'System Design',
    slug: 'system-design',
    questionCount: 0,
    available: false,
  },
  {
    id: 'cat-algorithms',
    name: 'Algorithms',
    slug: 'algorithms',
    questionCount: 0,
    available: false,
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get questions by language/category
 */
export function getQuestionsByLanguage(language: string): InterviewQuestion[] {
  switch (language) {
    case 'java':
      return javaQuestions
    case 'go':
      return goQuestions
    default:
      return []
  }
}

/**
 * Get single question by ID
 */
export function getQuestionById(id: string): InterviewQuestion | undefined {
  return allQuestions.find(q => q.id === id)
}

/**
 * Filter questions by difficulty
 */
export function filterByDifficulty(
  questions: InterviewQuestion[],
  difficulty: 'easy' | 'medium' | 'hard'
): InterviewQuestion[] {
  return questions.filter(q => q.difficulty === difficulty)
}

/**
 * Search questions by text
 */
export function searchQuestions(
  questions: InterviewQuestion[],
  query: string
): InterviewQuestion[] {
  const lowerQuery = query.toLowerCase()
  return questions.filter(
    q =>
      q.title.toLowerCase().includes(lowerQuery) ||
      q.question.toLowerCase().includes(lowerQuery) ||
      q.answer.toLowerCase().includes(lowerQuery) ||
      q.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get questions by tag
 */
export function filterByTag(
  questions: InterviewQuestion[],
  tag: string
): InterviewQuestion[] {
  return questions.filter(q =>
    q.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get edge case data (empty, malformed, etc.)
 */
export const edgeCaseQuestions = {
  empty: [] as InterviewQuestion[],
  singleQuestion: [javaQuestions[0]],
  noVideos: javaQuestions.filter(q => !q.video_url),
  withVideos: javaQuestions.filter(q => q.video_url),
  longTitle: {
    ...javaQuestions[0],
    title: 'A'.repeat(200),
  },
  emptyAnswer: {
    ...javaQuestions[0],
    answer: '',
  },
  specialCharacters: {
    ...javaQuestions[0],
    title: 'Test <script>alert("xss")</script> Question',
    tags: ['<tag>', 'normal-tag'],
  },
}
