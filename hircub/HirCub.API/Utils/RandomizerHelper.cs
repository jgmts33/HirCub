using System;
using System.Linq;

namespace CareHub.API.Utils
{
    public static class RandomizerHelper
    {
        public static bool Bool(this Random random) => random.Next(2) != 0;

        /// <summary>
        ///  NOTE: Enum should be dense (without gaps)
        ///  (or it should be modified to correctly skip gaps)
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="random"></param>
        /// <returns></returns>
        public static TEnum Enum<TEnum>(this Random random)
        {
            var values = System.Enum
                .GetValues(typeof(TEnum))
                .Cast<int>()
                .ToList();
            var min = values.Min();
            var max = values.Max();
            return (TEnum)(object)random.Next(min, max + 1);
        }

        public static bool Probable(this Random random, double probability) =>
            probability > 0.0 && (probability >= 1.0 || random.NextDouble() <= probability);
    }
}
