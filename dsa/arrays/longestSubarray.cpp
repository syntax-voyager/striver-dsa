#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int getLongestSubarray(vector<int> &a, long long k)
{
    unordered_map<long long, int> preSumMap;
    int n = a.size();
    long long sum = 0;
    int maxLen = 0;

    for (int i = 0; i < n; i++)
    {
        sum += a[i];

        if (sum == k)
        {
            maxLen = max(maxLen, i + 1);
        }

        long long rem = sum - k;

        if (preSumMap.count(rem))
        {
            maxLen = max(maxLen, (i - preSumMap[rem]));
        }

        if (!preSumMap.count(sum))
        {
            preSumMap[sum] = i;
        }
    }
    return maxLen;
}

int main()
{
    vector<int> a = {2, 3, 5, 1, 9};
    long long k = 10;
    int len = getLongestSubarray(a, k);
    cout << "The length of the longest subarray is: " << len << endl;
    return 0;
}