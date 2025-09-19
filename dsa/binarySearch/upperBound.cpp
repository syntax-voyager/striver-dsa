#include <iostream>

using namespace std;

int main()
{
    int arr[] = {1, 2, 2, 3};
    int n = 4;
    int x = 2;
    int ans = -1;

    int start = 0, end = n - 1;

    while (start <= end)
    {
        int mid = start + (end - start) / 2;

        if (arr[mid] > x)
        {
            ans = mid;
            end = mid - 1;
        }
        else
        {
            start = mid + 1;
        }
    }

    cout << ans << endl;

    return 0;
}