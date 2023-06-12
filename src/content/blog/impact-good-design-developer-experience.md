---
author: Gustavo Martins T Borges
pubDatetime: 2023-09-30T12:36:00.000Z
title: The impact of a good concurrency design in the development experience
featured: true
tags:
  - programming-languages
  - design
  - elixir
---

Since I saw this lecture from Sasa Juric - [The Soul of Erlang and Elixir](https://www.youtube.com/watch?v=JvBT4XBdoUE), I got really
exited by how a good language design can make the developer experience so incredible.

Since the begging of my career, concurrency was always a complex topic. In the popular languages, everyone avoid this.
I believed that is in fact complex, however after saw this lecture I mentioned and have started to programming in Elixir,
I understood that the problem isn't the concurrency itself, but how languages design their concurrency model.

In Elixir is so simple that basically you don't need to know nothing about deadlocks, race conditions, consistency.
You only need to know about the interface (spawn, send, receive). Seems like a joke in the begging, but is true.

All the dirty work is handle by the BEAM (Erlang VM), a battle tested virtual machine that work pretty well with concurrency,
because of the good implemented design using the Actor model.

I will show you the benefit of a good design, showing these two implementations.
One is a programming language with a poorly concurrent design and the other with a better one.

```java
public class BadConcurrency {

    private static int counter = 0;

    public static void main(String[] args) {

    Thread thread1 = new Thread(() -> {
        for (int i = 0; i < 1000; i++) {
            counter++; // Increment the shared counter variable
        }
    });

    Thread thread2 = new Thread(() -> {
        for (int i = 0; i < 1000; i++) {
        counter--; // Decrement the shared counter variable
        }
    });

    thread1.start();
    thread2.start();

    // Wait for both threads to complete

    try {
        thread1.join();
        thread2.join();
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    System.out.println("Counter value: " + counter);

    }
}
```

Compile

```bash
javac BadConcurrency.java
```

Result

```bash
$ java BadConcurrency
Counter value: -4234

$ java BadConcurrency
Counter value: 10541

$ java BadConcurrency
Counter value: -23515

$ java BadConcurrency
Counter value: -17001
```

You can fix this by using a `synchronized` inside the Thread block, lock by a object.
But under the hood what it's really doing is make the code synchronous, the opposite of concurrent 🤷🏽‍♂️

```java
...
    private static int counter = 0;
    private static final Object lock = new Object();
...
    Thread thread1 = new Thread(() -> {
      synchronized(lock) {
        for (int i = 0; i < 100000; i++) {
            counter++; // Increment the shared counter variable
        }
      }
    });
...
```

Blinded defenders will argue that I'm doing it wrong, however, if the language allows me to
do this, I don't think I'm wrong.

Now in a language that, by design, has a good concurrency model in it's core.

```elixir
defmodule GoodConcurrency do
  @moduledoc """
  Documentation for `GoodConcurrency`.
  """

  @doc """
  Show how concurrency is better implemented in ELixir.

  ## Examples

      iex> GoodConcurrency.main()
      "Counter value: 0"

  """
  def main do
    counter = 0

    spawn(fn ->
      for _ <- 0..100_000 do
        counter = counter + 1
      end
    end)

    spawn(fn ->
      for _ <- 0..100_000 do
        counter = counter - 1
      end
    end)

    "Counter value: " <> to_string(counter)
  end
end
```

Compile

```bash
iex good_concurrency.ex
```

Result

```bash
iex(1)> GoodConcurrency.main()
"Counter value: 0"
iex(2)> GoodConcurrency.main()
"Counter value: 0"
iex(3)> GoodConcurrency.main()
"Counter value: 0"
iex(4)> GoodConcurrency.main()
"Counter value: 0"
iex(5)>
```

`counter` is immutable, so the increment `counter + 1` and decrement `counter - 1` inside the spawned "threads" will always be `0 + 1` and `0 - 1`.
And the counter variable inside the loop is a new inner scoped variable.
Therefore the two spawned processes are running fully isolated from each other,
and never reassign outer scoped variables. This way, concurrency occurs seamless, no deadlock, no race conditions, and no imperative thread controls.

Erlang resolved concurrency using the Actor model since 3 decades. While popular languages are struggling to make syntax sugar on their design.

These popular languages try to convince you that concurrency is really complex and
unpredictable, inciting an afraid to learn his concurrency model.
And if you really want to learn concurrency, you need to read a 400 pages book, maybe 2x.
But deeper the message is "Please, don't use our awful concurrency model, because of that we made them complex to understand"

# References

### The Soul of Erlang and Elixir • Sasa Juric • GOTO 2019

https://www.youtube.com/watch?v=JvBT4XBdoUE

### How we program multicores - Joe Armstrong

https://www.youtube.com/watch?v=bo5WL5IQAd0
