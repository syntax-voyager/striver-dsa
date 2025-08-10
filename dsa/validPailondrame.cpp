#include <iostream>

using namespace std;

bool isAlphanumeric(char c)
{
    if (c >= 0 && c <= 9)
        return true;
    if (c >= 'A' && c <= 'Z')
        return true;
    if (c >= 'a' && c <= 'z')
        return true;
}

char lower(char c)
{
    if (c >= 'A' && c <= 'Z')
        return c - 'A' + 'a';
    return c;
}

int main()
{
    // cout << isAlphanumeric(',') << endl;
    cout << lower(',') << endl;

    return 0;
}