#include <iostream>

using namespace std;

int main()
{
    int nums[] = {2, 2, 3, 3, 3, 3, 4};
    int n = 7;
    int x = 3;

    int freq = -1;

    int start = 0, end = n - 1;
    while (start <= end)
    {
        int mid = start + (end - start);

        if (nums[mid] == x)
        {
            freq++;
            end = mid - 1;
        }
        else if (nums[mid] < x)
        {
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
        int mid = start + (end - start);

        if (nums[mid] == x)
        {
            freq++;
            start = mid + 1;
        }
        else if (nums[mid] < x)
        {
            start = mid + 1;
        }
        else
        {
            end = mid - 1;
        }
    }
    cout << freq << endl;
    return 0;
}