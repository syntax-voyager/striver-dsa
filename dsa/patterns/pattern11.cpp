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
            if ((count % 2) == 0)
            {
                cout << 0;
            }
            else
            {
                cout << 1;
            }
        }
        cout << endl;
    }
}

int main()
{
    patternPrint(5);
    return 0;
}