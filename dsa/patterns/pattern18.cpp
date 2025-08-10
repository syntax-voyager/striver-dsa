#include <iostream>
using namespace std;

void patternPrint(int n)
{
    char c = 'A';
    c += n - 1;
    for (int i = 1; i <= n; i++)
    {
        char d = c;
        for (int j = 1; j <= i; j++)
        {
            cout << d;
            d++;
        }
        c--;
        cout << endl;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}