#include <iostream>

using namespace std;

int main()
{
    int arr[] = {3, 4, 4, 7, 8, 10};
    int n = 6;
    int x = 8;

    int floor = -1, ceil = -1;

    int start = 0, end = n - 1;

    while (start <= end)
    {
        int mid = start + (end - start) / 2;

        if (arr[mid] <= x)
        {
            floor = arr[mid];
            start = mid + 1;
        }
        else
        {
            end = mid - 1;
        }
    }

    start = 0, end = n - 1;

    while (start <= end)
    {
        int mid = start + (end - start) / 2;

        if (arr[mid] >= x)
        {
            ceil = arr[mid];
            end = mid - 1;
        }
        else
        {
            start = mid + 1;
        }
    }

    cout << floor << " " << ceil << endl;
}