#include <iostream>

using namespace std;

int main()
{
    int s = 4230;
    int answer = 0;
    while (s > 0)
    {
        int n = s % 10;
        s /= 10;
        answer = (answer * 10) + n;
    }
    cout << answer << endl;
    return 0;
}