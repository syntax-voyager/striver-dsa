#include <iostream>
using namespace std;

void patterPrint(int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {

            cout << "*";
        }
        cout << endl;
    }
}

int main()
{
    patterPrint(5);
    return 0;
}