﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TS7S.Entity;

namespace StickIt.Data.Contracts
{
    public interface IStickItUow : IUow
    {
        IPlaceRepository Places { get; }
        IStickBookRepository StickBooks { get; }
        IStickSheetRepository StickSheets { get; }
        IStickSheetItemRepository StickSheetItems { get; }
    }
}