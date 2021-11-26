const stubs = {};

stubs.cpp = `#include <iostream>
#include <stdio.h>
using namespace std;
int main() {
  cout<<"Hello world!\\n";
  return 0;
}
`;

stubs.py = `print("Hello world!")`;

stubs.java = `public class Main {
public static void main(String args[]) {
System.out.print("Hello World");
} 

}`

stubs.c = `#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}`

export default stubs;
