#include <iostream>
#include <vector>
using namespace std;
// you are given an array arr of size N and you are provided with a number k. you have to pick k consecutive elements from the array arr, check if their sum is even, and make a count on every even sum. If K consecutive elements have an even sum, then print the count of even sums, otherweise print -1.

int main()
{

    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }
    int k;
    cin >> k;

    int count = 0;
    // sliding window
    int sum = 0;
    for (int i = 0; i < k; i++)
    {
        sum += arr[i];
    }
    if (sum % 2 == 0)
        count++;
    for (int i = k; i < n; i++)
    {
        sum -= arr[i - k];
        sum += arr[i];
        if (sum % 2 == 0)
            count++;
    }

    if (count == 0)
    {
        cout << -1 << endl;
    }
    else
        cout << count << endl;

    return 0;
}