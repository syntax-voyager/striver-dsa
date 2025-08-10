#include <iostream>
using namespace std;

void patternPrint(int n)
{
    int count = 0;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= i; j++)
        {
            count++;
            cout << count;
        }
        cout << endl;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}