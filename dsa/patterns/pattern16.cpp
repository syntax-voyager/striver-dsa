#include <iostream>
using namespace std;

void patternPrint(int n)
{
    char c = 'A';
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= i; j++)
        {
            cout << c;
        }
        cout << endl;
        c++;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}