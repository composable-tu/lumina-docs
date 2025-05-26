# 面向 Java 开发者的 Kotlin 入门指导 <Badge type="tip" text="尚未完成" />

Kotlin 是一种开源静态类型编程语言，面向 JVM、Android、JavaScript、Wasm 和 Native。它由 [JetBrains](https://www.jetbrains.com/) 开发，旨在提升开发者的开发效率。它简洁、安全，能够与 Java 和其他语言互操作，并提供多种跨平台复用代码的方式，从而实现高效的编程。

## 为什么要学习 Kotlin？

对于 Java 开发者，Kotlin 是一门学了肯定不会后悔的语言：

- **Kotlin 简洁且富有表现力**：您可以使用更少的代码实现更多的功能，用更少的样板代码表达自己的想法。
- **使用 Kotlin 可以写出更安全的代码**：Kotlin 有许多来自语言本身的函数式功能，可帮助避免 `null` 指针异常等常见编程错误。
- **Kotlin 可运行在 Java 虚拟机（JVM）平台上**：Java 能做的所有事情 Kotlin 都能做，并且比编写 Java 更轻松。可以在 Kotlin 代码中调用 Java 代码，或者在 Java 代码中调用 Kotlin 代码。
- **Kotlin 协程让异步代码像阻塞代码一样易于使用**：协程可大幅简化后台任务管理，例如网络调用、本地数据访问等任务的管理。

来几个简单代码例，这是 Java 实现打印 `Hello World`：

```Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

这是 Kotlin：

```Kotlin
fun main() {
    println("Hello World!")
}
```

这是 Java 实现数据类：

```Java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
}
```

这是 Kotlin：

```Kotlin
data class Person(
    var name: String,
    var age: Int
)
```

```Kotlin
fun main() {
    val person = Person("Kotlin", 18)
    println(person.age) // 不需要手动实现 getter 方法即可访问属性
    person.name = "Lumina" // 不需要手动实现 setter 方法即可修改属性
}
```

这是 Java 防御空指针：

```Java
if (person != null && person.getName() != null) {
    System.out.println(person.getName());
}
```

这是 Kotlin：

```Kotlin
person?.name?.let {
    println(it) // 仅在非空时执行
}
```

## Kotlin 基本语法

### 声明变量

Kotlin 的变量声明方式与 Java 不同，Kotlin 使用两个不同的关键字：`val` 和 `var` 来声明变量。

- `val` 用于值从不更改的变量，即不可变变量。使用 `val` 声明的变量一旦第一次赋值后就无法重新赋值。
- `var` 用于值可以更改的变量，即可变变量。

```Kotlin
val name = "Kotlin"
var age = 18
```

### 基本类型

可能有读者已经发现了，在上述变量声明中，Kotlin 居然不需要事先声明变量类型就能创建变量，这是因为 Kotlin 编译器在声明变量时会在编译阶段自动推导变量类型。

Kotlin 是静态强类型语言，在 JVM 平台的类型系统和 Java 一致，但 Kotlin（在代码编写时）的所有类型都是对象，没有原始类型与包装类型的区分。

Kotlin 在 JVM 平台的 8 种基本数据类型如下：

- 整数类型：`Byte`、`Short`、`Int`、`Long`，默认 `Int`
- 浮点类型：`Float`、`Double`，默认 `Double`
- 字符类型：`Char`
- 布尔类型：`Boolean`

如果要指定变量的类型，可以在变量名后加上类型声明：

```Kotlin
val name: String = "Kotlin"
var age: Long = 18
```

给 `val` 声明类型后可稍后再初始赋值，赋值后不可更改：

```Kotlin
val name: String // 未初始化，此时读取值会报错
name = "Kotlin" // 初始化
```

如果要转换类型，基本类型间转换需使用形如 `toXxx()` 的转换函数（例如 `toInt()`, `toLong()`）：

```Kotlin
val age = 18
val ageLong = age.toLong()
val ageString = age.toString()
```

### 字符串模板

Kotlin 支持字符串模板，即在字符串中插入变量，使用 `$变量名` 或 `${变量名}` 表示在字符串中插入变量：

```Kotlin
val name = "Kotlin"
println("Hello $name") // "Hello Kotlin"
println("Hello ${name}") // "Hello Kotlin"
println("Hello ${name.toUpperCase()}") // "Hello KOTLIN"
```

### Null 安全

在声明可空变量时，需要在变量名后加上 `?`，表示该变量可为 `null`：

```Kotlin
var name: String? = "Kotlin"
name = null // 可赋值 null 而不报错
```

Kotlin 提供了 `?.`、`?:`、`!!` 等 Null 安全操作符，用于处理 `null` 值：

- `?.`：安全调用操作符，用于在对象不为 `null` 时调用其方法或访问其属性。如果变量为 `null`，则返回 `null`，否则返回变量的值
- `?:`：Elvis 操作符，用于在表达式为 `null` 时提供一个默认值。如果左侧表达式的结果为 `null`，则返回右侧表达式的值，否则返回左侧表达式的结果
- `!!`：非空断言，强制将可空类型转换为非空类型。如果变量为 `null`，则抛出异常

```Kotlin
val name: String? = null
val nameUpper = name?.toUpperCase() // null
val nameUpperOrDefault = name?.toUpperCase() ?: "Default" // "Default"
val nameUpper2 = name!!.toUpperCase() // 抛出异常
```

### 集合类型

Kotlin 提供了 3 种集合类型：

- `List`：有序列表
  - `MutableList`：可变 `List`
- `Set`：无序列表（数学集合），不允许重复元素
  - `MutableSet`：可变 `Set`
- `Map`：无序键值对，键不允许重复
  - `MutableMap`：可变 `Map`

每个集合类型都可以是可变的或只读的，可以使用 `mutableListOf()`、`mutableSetOf()`、`mutableMapOf()` 创建可变集合，使用 `listOf()`、`setOf()`、`mapOf()` 创建只读集合。

### 控制语句

Kotlin 支持常见的 `if`、`when`、`for`、`while` 等控制语句。

此外，使用 `in` 表示范围条件，使用 `!in` 表示范围条件取反，使用 `is` 表示类型条件。

```Kotlin
val age = 18
if (age >= 18) {
    println("Adult")
} else {
    println("Child")
}

when (age) {
    in 0..17 -> println("Child")
    in 18..64 -> println("Adult")
    else -> println("Senior")
}

when (age) {
    is Int -> println("Int")
    is String -> println("String")
    else -> println("Other")
}

for (i in 0..10) { // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    println(i)
}

while (true) {
    println("Hello World")
}
```

除了上述控制语句，Kotlin 还提供了如 `forEach` 这样的集合扩展函数。`forEach` 是定义在可迭代对象上的扩展函数，可以更简洁地遍历集合：

```Kotlin
val list = listOf(5, 4, 3, 2, 1)
list.forEach {
    println(it)
}
list.forEachIndexed { index, element ->
    println("索引：$index, 值：$element") // 例如 索引：0, 值：5
}

val map = mapOf(1 to "One", 2 to "Two", 3 to "Three")
map.forEach { (key, value) ->
    println("Key: $key, Value: $value")
}
```

### 函数

在 Java 中，类是第一公民，但在 Kotlin 中，函数也是第一公民。函数有自己的类型，可作为参数传递，赋值。

因为 Kotlin 函数是第一公民，所以 Kotlin 并不是纯粹的面向对象语言。实际上，Kotlin 是一门既支持函数式范式又支持面向对象范式的语言。

函数可以在 `.kt` 文件顶层声明。传统的函数声明格式如下：

```Kotlin
// 有返回值的函数
fun functionName(param1: Type1, param2: Type2): ReturnType { return value }
```

```Kotlin
// 无返回函数
fun functionName(param1: Type1, param2: Type2) { actions() }
```

表达式函数体格式：

```Kotlin
fun sum(x: Int, y: Int): Int = x + y
```

```Kotlin
// 因为类型推断，所以也可以省略表达式函数体的返回类型
fun sum(x: Int, y: Int) = x + y
```

Lambda 函数格式：

```Kotlin
// 完整语法：参数类型可显式声明
val sum: (Int, Int) -> Int = { a: Int, b: Int -> a + b }
```

```Kotlin
// 省略参数类型，根据函数类型自动推断
val sum: (Int, Int) -> Int = { a, b -> a + b }
```

```Kotlin
// 未显式声明变量类型，从 Lambda 体推导类型
val multiply = { x: Int, y: Int -> x * y } // 类型自动推导为 (Int, Int) -> Int
```

```Kotlin
// 无参数 Lambda
val greet = { println("Hello") }
```

Lambda 作为高阶函数的核心，常用于集合操作、异步任务等场景：

```Kotlin
val list = listOf(1, 2, 3, 4, 5)
val sum = list.fold(0) { acc, i -> acc + i } // 15
val list2 = list.map { it * 2 } // [2, 4, 6, 8, 10]

// 多行 Lambda
val complexCalc = list.map { 
    val temp = it * 2
    temp + 1 
} // [3, 5, 7, 9, 11]
```

Lambda 的最后一个表达式自动作为返回值，无需 `return`。

### 类

到目前为止提到的所有类型都已内置在 Kotlin 中。如果希望添加自定义类型，可以使用 `class` 关键字来定义类：

```Kotlin
class Person {
    // 类体中可定义其他成员
} // 无参构造
```

```Kotlin
class Person(val name: String, val age: Int) {
    // 类体中可定义其他成员
} // 有参构造
```

在主构造函数中，只有用 `val` 或 `var` 声明的参数才会自动成为类的属性并可被访问。未加 `val` 或 `var` 的参数仅作为构造函数的参数，不能作为属性访问。如需定义私有成员，请在类体中使用 `private` 修饰符声明成员：

```Kotlin
class Person(val name: String, val age: Int) {
    private val privateName = name
    
    fun getPrivateName() = privateName
}

val person = Person("Kotlin", 18)
println(person.name) // "Kotlin"
println(person.privateName) // 编译时报错：访问失败
println(person.getPrivateName()) // "Kotlin"
```

## 后续

到目前为止，上述内容已经足够支撑编写强大的 Kotlin/JVM 应用了。如需了解 Kotlin 的更多内容，请参阅[官方 Kotlin 文档](https://kotlinlang.org/)。

## 参考

1. Kotlin 官网：https://kotlinlang.org/
2. Android Developer——《学习 Kotlin 编程语言》：https://developer.android.com/kotlin/learn
